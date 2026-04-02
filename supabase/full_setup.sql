-- ============================================
-- BAGDROP — FULL DATABASE SETUP
-- Run this entire script in Supabase SQL Editor
-- ============================================

-- ============================================
-- 001: Initial Schema
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "btree_gist";

CREATE TYPE locker_size AS ENUM ('SMALL', 'LARGE');
CREATE TYPE locker_status AS ENUM ('AVAILABLE', 'OCCUPIED', 'MAINTENANCE');
CREATE TYPE booking_status AS ENUM ('PENDING', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED');
CREATE TYPE payment_status AS ENUM ('PENDING', 'PAID', 'REFUNDED', 'FAILED');
CREATE TYPE user_role AS ENUM ('USER', 'ADMIN');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'USER',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

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
  CONSTRAINT no_overlap EXCLUDE USING gist (
    locker_id WITH =,
    tstzrange(start_time, end_time) WITH &&
  ) WHERE (status NOT IN ('CANCELLED'))
);

CREATE INDEX idx_lockers_trailer ON public.lockers(trailer_id);
CREATE INDEX idx_lockers_status ON public.lockers(status);
CREATE INDEX idx_bookings_user ON public.bookings(user_id);
CREATE INDEX idx_bookings_locker ON public.bookings(locker_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_time ON public.bookings(start_time, end_time);
CREATE INDEX idx_trailers_active ON public.trailers(active);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trailers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lockers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN'));

CREATE POLICY "Anyone can view active trailers" ON public.trailers FOR SELECT USING (active = true);
CREATE POLICY "Admins can manage trailers" ON public.trailers FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN'));

CREATE POLICY "Anyone can view lockers" ON public.lockers FOR SELECT USING (true);
CREATE POLICY "Admins can manage lockers" ON public.lockers FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN'));

CREATE POLICY "Users can view own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage all bookings" ON public.bookings FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN'));

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.trailers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================
-- 002: Airport Delivery Feature
-- ============================================

CREATE TYPE booking_type AS ENUM ('STORAGE', 'DELIVERY');
CREATE TYPE delivery_status AS ENUM ('SCHEDULED', 'LOADING', 'IN_TRANSIT', 'ARRIVED', 'COMPLETED', 'CANCELLED');

CREATE TABLE public.delivery_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trailer_id UUID NOT NULL REFERENCES public.trailers(id) ON DELETE CASCADE,
  status delivery_status NOT NULL DEFAULT 'SCHEDULED',
  scheduled_departure TIMESTAMPTZ NOT NULL,
  actual_departure TIMESTAMPTZ,
  estimated_arrival TIMESTAMPTZ,
  actual_arrival TIMESTAMPTZ,
  current_lat DOUBLE PRECISION,
  current_lng DOUBLE PRECISION,
  gps_updated_at TIMESTAMPTZ,
  destination_lat DOUBLE PRECISION NOT NULL DEFAULT 50.9014,
  destination_lng DOUBLE PRECISION NOT NULL DEFAULT 4.4844,
  destination_address TEXT NOT NULL DEFAULT 'Brussels Airport (BRU) — Kiss & Ride Zone',
  tracking_token UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  driver_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.delivery_prices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  locker_size locker_size NOT NULL UNIQUE,
  price NUMERIC(10,2) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true
);

INSERT INTO public.delivery_prices (locker_size, price) VALUES ('SMALL', 15.00), ('LARGE', 25.00);

ALTER TABLE public.bookings
  ADD COLUMN booking_type booking_type NOT NULL DEFAULT 'STORAGE',
  ADD COLUMN delivery_run_id UUID REFERENCES public.delivery_runs(id),
  ADD COLUMN deposit_deadline TIMESTAMPTZ;

CREATE INDEX idx_delivery_runs_trailer ON public.delivery_runs(trailer_id);
CREATE INDEX idx_delivery_runs_status ON public.delivery_runs(status);
CREATE INDEX idx_delivery_runs_tracking ON public.delivery_runs(tracking_token);
CREATE INDEX idx_bookings_delivery_run ON public.bookings(delivery_run_id);
CREATE INDEX idx_bookings_type ON public.bookings(booking_type);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.delivery_runs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.delivery_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own delivery runs" ON public.delivery_runs FOR SELECT USING (EXISTS (SELECT 1 FROM public.bookings WHERE bookings.delivery_run_id = delivery_runs.id AND bookings.user_id = auth.uid()));
CREATE POLICY "Anyone can view delivery run by tracking token" ON public.delivery_runs FOR SELECT USING (true);
CREATE POLICY "Admins can manage delivery runs" ON public.delivery_runs FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN'));

CREATE POLICY "Anyone can view delivery prices" ON public.delivery_prices FOR SELECT USING (true);
CREATE POLICY "Admins can manage delivery prices" ON public.delivery_prices FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN'));

ALTER PUBLICATION supabase_realtime ADD TABLE public.delivery_runs;

-- ============================================
-- SEED DATA: 5 Brussels locations with lockers
-- ============================================

INSERT INTO public.trailers (id, name, address, latitude, longitude, active, opening_time, closing_time) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'BagDrop Grand-Place', 'Rue de la Colline 1, 1000 Bruxelles', 50.8467, 4.3525, true, '08:00', '22:00'),
  ('a1000000-0000-0000-0000-000000000002', 'BagDrop Gare du Midi', 'Avenue Fonsny 47B, 1060 Bruxelles', 50.8354, 4.3365, true, '06:00', '23:00'),
  ('a1000000-0000-0000-0000-000000000003', 'BagDrop Gare Centrale', 'Boulevard de l''Imperatrice 2, 1000 Bruxelles', 50.8456, 4.3567, true, '07:00', '22:00'),
  ('a1000000-0000-0000-0000-000000000004', 'BagDrop Manneken Pis', 'Rue du Chene 3, 1000 Bruxelles', 50.8450, 4.3498, true, '08:00', '21:00'),
  ('a1000000-0000-0000-0000-000000000005', 'BagDrop Atomium', 'Place de l''Atomium 1, 1020 Bruxelles', 50.8947, 4.3416, true, '09:00', '20:00');

INSERT INTO public.lockers (trailer_id, label, size, status, width_cm, height_cm, depth_cm, price_per_hour) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'A1', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000001', 'A2', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000001', 'A3', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000001', 'A4', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000001', 'B1', 'LARGE', 'AVAILABLE', 60, 35, 85, 4.00),
  ('a1000000-0000-0000-0000-000000000001', 'B2', 'LARGE', 'AVAILABLE', 60, 35, 85, 4.00),
  ('a1000000-0000-0000-0000-000000000002', 'A1', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000002', 'A2', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000002', 'A3', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000002', 'A4', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000002', 'B1', 'LARGE', 'AVAILABLE', 60, 35, 85, 4.00),
  ('a1000000-0000-0000-0000-000000000002', 'B2', 'LARGE', 'AVAILABLE', 60, 35, 85, 4.00),
  ('a1000000-0000-0000-0000-000000000003', 'A1', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000003', 'A2', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000003', 'A3', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000003', 'A4', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000003', 'B1', 'LARGE', 'AVAILABLE', 60, 35, 85, 4.00),
  ('a1000000-0000-0000-0000-000000000003', 'B2', 'LARGE', 'AVAILABLE', 60, 35, 85, 4.00),
  ('a1000000-0000-0000-0000-000000000004', 'A1', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000004', 'A2', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000004', 'A3', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000004', 'A4', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000004', 'B1', 'LARGE', 'AVAILABLE', 60, 35, 85, 4.00),
  ('a1000000-0000-0000-0000-000000000004', 'B2', 'LARGE', 'AVAILABLE', 60, 35, 85, 4.00),
  ('a1000000-0000-0000-0000-000000000005', 'A1', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000005', 'A2', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000005', 'A3', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000005', 'A4', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000005', 'B1', 'LARGE', 'AVAILABLE', 60, 35, 85, 4.00),
  ('a1000000-0000-0000-0000-000000000005', 'B2', 'LARGE', 'AVAILABLE', 60, 35, 85, 4.00);
