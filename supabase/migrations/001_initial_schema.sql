-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "btree_gist";

-- ENUM types
CREATE TYPE locker_size AS ENUM ('SMALL', 'LARGE');
CREATE TYPE locker_status AS ENUM ('AVAILABLE', 'OCCUPIED', 'MAINTENANCE');
CREATE TYPE booking_status AS ENUM ('PENDING', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED');
CREATE TYPE payment_status AS ENUM ('PENDING', 'PAID', 'REFUNDED', 'FAILED');
CREATE TYPE user_role AS ENUM ('USER', 'ADMIN');

-- Users (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'USER',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trailers
CREATE TABLE public.trailers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  opening_time TIME NOT NULL DEFAULT '08:00',
  closing_time TIME NOT NULL DEFAULT '22:00',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Lockers
CREATE TABLE public.lockers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trailer_id UUID NOT NULL REFERENCES public.trailers(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  size locker_size NOT NULL,
  status locker_status NOT NULL DEFAULT 'AVAILABLE',
  width_cm INTEGER NOT NULL,
  height_cm INTEGER NOT NULL,
  depth_cm INTEGER NOT NULL,
  price_per_hour NUMERIC(6,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Bookings
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  locker_id UUID NOT NULL REFERENCES public.lockers(id),
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status booking_status NOT NULL DEFAULT 'PENDING',
  qr_code TEXT UNIQUE NOT NULL,
  total_price NUMERIC(8,2) NOT NULL,
  payment_status payment_status NOT NULL DEFAULT 'PENDING',
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- Prevent overlapping bookings on the same locker
  CONSTRAINT no_overlap EXCLUDE USING gist (
    locker_id WITH =,
    tstzrange(start_time, end_time) WITH &&
  ) WHERE (status NOT IN ('CANCELLED'))
);

-- Indexes
CREATE INDEX idx_lockers_trailer ON public.lockers(trailer_id);
CREATE INDEX idx_lockers_status ON public.lockers(status);
CREATE INDEX idx_bookings_user ON public.bookings(user_id);
CREATE INDEX idx_bookings_locker ON public.bookings(locker_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_time ON public.bookings(start_time, end_time);
CREATE INDEX idx_trailers_active ON public.trailers(active);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trailers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lockers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

-- Trailers policies
CREATE POLICY "Anyone can view active trailers"
  ON public.trailers FOR SELECT
  USING (active = true);

CREATE POLICY "Admins can manage trailers"
  ON public.trailers FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

-- Lockers policies
CREATE POLICY "Anyone can view lockers"
  ON public.lockers FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage lockers"
  ON public.lockers FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

-- Bookings policies
CREATE POLICY "Users can view own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all bookings"
  ON public.bookings FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

-- Trigger: auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Trigger: auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.trailers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
