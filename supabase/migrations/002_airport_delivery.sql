-- ============================================
-- 002: Airport Delivery Feature
-- ============================================

-- New enums
CREATE TYPE booking_type AS ENUM ('STORAGE', 'DELIVERY');
CREATE TYPE delivery_status AS ENUM ('SCHEDULED', 'LOADING', 'IN_TRANSIT', 'ARRIVED', 'COMPLETED', 'CANCELLED');

-- Delivery runs: one run = one trailer going to the airport
CREATE TABLE public.delivery_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trailer_id UUID NOT NULL REFERENCES public.trailers(id) ON DELETE CASCADE,
  status delivery_status NOT NULL DEFAULT 'SCHEDULED',
  scheduled_departure TIMESTAMPTZ NOT NULL,
  actual_departure TIMESTAMPTZ,
  estimated_arrival TIMESTAMPTZ,
  actual_arrival TIMESTAMPTZ,
  -- GPS coords updated by driver's phone
  current_lat DOUBLE PRECISION,
  current_lng DOUBLE PRECISION,
  gps_updated_at TIMESTAMPTZ,
  -- Fixed destination: Brussels Airport (Zaventem)
  destination_lat DOUBLE PRECISION NOT NULL DEFAULT 50.9014,
  destination_lng DOUBLE PRECISION NOT NULL DEFAULT 4.4844,
  destination_address TEXT NOT NULL DEFAULT 'Brussels Airport (BRU) — Kiss & Ride Zone',
  -- Public tracking token
  tracking_token UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  driver_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Fixed delivery prices per locker size
CREATE TABLE public.delivery_prices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  locker_size locker_size NOT NULL UNIQUE,
  price NUMERIC(10,2) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true
);

-- Seed fixed prices
INSERT INTO public.delivery_prices (locker_size, price) VALUES
  ('SMALL', 15.00),
  ('LARGE', 25.00);

-- Add delivery columns to bookings
ALTER TABLE public.bookings
  ADD COLUMN booking_type booking_type NOT NULL DEFAULT 'STORAGE',
  ADD COLUMN delivery_run_id UUID REFERENCES public.delivery_runs(id),
  ADD COLUMN deposit_deadline TIMESTAMPTZ;

-- Indexes
CREATE INDEX idx_delivery_runs_trailer ON public.delivery_runs(trailer_id);
CREATE INDEX idx_delivery_runs_status ON public.delivery_runs(status);
CREATE INDEX idx_delivery_runs_tracking ON public.delivery_runs(tracking_token);
CREATE INDEX idx_bookings_delivery_run ON public.bookings(delivery_run_id);
CREATE INDEX idx_bookings_type ON public.bookings(booking_type);

-- Auto-update updated_at on delivery_runs
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.delivery_runs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- RLS
ALTER TABLE public.delivery_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_prices ENABLE ROW LEVEL SECURITY;

-- delivery_runs: users can see runs linked to their bookings
CREATE POLICY "Users can view own delivery runs"
  ON public.delivery_runs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.bookings
      WHERE bookings.delivery_run_id = delivery_runs.id
        AND bookings.user_id = auth.uid()
    )
  );

-- delivery_runs: anyone can view by tracking_token (for public tracking page)
CREATE POLICY "Anyone can view delivery run by tracking token"
  ON public.delivery_runs FOR SELECT
  USING (true);

-- delivery_runs: admins can manage all
CREATE POLICY "Admins can manage delivery runs"
  ON public.delivery_runs FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

-- delivery_prices: everyone can read
CREATE POLICY "Anyone can view delivery prices"
  ON public.delivery_prices FOR SELECT
  USING (true);

-- delivery_prices: admins can manage
CREATE POLICY "Admins can manage delivery prices"
  ON public.delivery_prices FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
  );

-- Enable Supabase Realtime for GPS tracking
ALTER PUBLICATION supabase_realtime ADD TABLE public.delivery_runs;
