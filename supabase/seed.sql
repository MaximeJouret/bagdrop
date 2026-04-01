-- Seed data: 5 trailer locations in Brussels with lockers

-- Grand-Place area
INSERT INTO public.trailers (id, name, address, latitude, longitude, active, opening_time, closing_time) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'BagDrop Grand-Place', 'Rue de la Colline 1, 1000 Bruxelles', 50.8467, 4.3525, true, '08:00', '22:00'),
  ('a1000000-0000-0000-0000-000000000002', 'BagDrop Gare du Midi', 'Avenue Fonsny 47B, 1060 Bruxelles', 50.8354, 4.3365, true, '06:00', '23:00'),
  ('a1000000-0000-0000-0000-000000000003', 'BagDrop Gare Centrale', 'Boulevard de l''Imperatrice 2, 1000 Bruxelles', 50.8456, 4.3567, true, '07:00', '22:00'),
  ('a1000000-0000-0000-0000-000000000004', 'BagDrop Manneken Pis', 'Rue du Chene 3, 1000 Bruxelles', 50.8450, 4.3498, true, '08:00', '21:00'),
  ('a1000000-0000-0000-0000-000000000005', 'BagDrop Atomium', 'Place de l''Atomium 1, 1020 Bruxelles', 50.8947, 4.3416, true, '09:00', '20:00');

-- Lockers for Grand-Place (4 small + 2 large)
INSERT INTO public.lockers (trailer_id, label, size, status, width_cm, height_cm, depth_cm, price_per_hour) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'A1', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000001', 'A2', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000001', 'A3', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000001', 'A4', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000001', 'B1', 'LARGE', 'AVAILABLE', 60, 35, 85, 4.00),
  ('a1000000-0000-0000-0000-000000000001', 'B2', 'LARGE', 'AVAILABLE', 60, 35, 85, 4.00);

-- Lockers for Gare du Midi (4 small + 2 large)
INSERT INTO public.lockers (trailer_id, label, size, status, width_cm, height_cm, depth_cm, price_per_hour) VALUES
  ('a1000000-0000-0000-0000-000000000002', 'A1', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000002', 'A2', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000002', 'A3', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000002', 'A4', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000002', 'B1', 'LARGE', 'AVAILABLE', 60, 35, 85, 4.00),
  ('a1000000-0000-0000-0000-000000000002', 'B2', 'LARGE', 'AVAILABLE', 60, 35, 85, 4.00);

-- Lockers for Gare Centrale (4 small + 2 large)
INSERT INTO public.lockers (trailer_id, label, size, status, width_cm, height_cm, depth_cm, price_per_hour) VALUES
  ('a1000000-0000-0000-0000-000000000003', 'A1', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000003', 'A2', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000003', 'A3', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000003', 'A4', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000003', 'B1', 'LARGE', 'AVAILABLE', 60, 35, 85, 4.00),
  ('a1000000-0000-0000-0000-000000000003', 'B2', 'LARGE', 'AVAILABLE', 60, 35, 85, 4.00);

-- Lockers for Manneken Pis (4 small + 2 large)
INSERT INTO public.lockers (trailer_id, label, size, status, width_cm, height_cm, depth_cm, price_per_hour) VALUES
  ('a1000000-0000-0000-0000-000000000004', 'A1', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000004', 'A2', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000004', 'A3', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000004', 'A4', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000004', 'B1', 'LARGE', 'AVAILABLE', 60, 35, 85, 4.00),
  ('a1000000-0000-0000-0000-000000000004', 'B2', 'LARGE', 'AVAILABLE', 60, 35, 85, 4.00);

-- Lockers for Atomium (4 small + 2 large)
INSERT INTO public.lockers (trailer_id, label, size, status, width_cm, height_cm, depth_cm, price_per_hour) VALUES
  ('a1000000-0000-0000-0000-000000000005', 'A1', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000005', 'A2', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000005', 'A3', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000005', 'A4', 'SMALL', 'AVAILABLE', 40, 30, 60, 2.50),
  ('a1000000-0000-0000-0000-000000000005', 'B1', 'LARGE', 'AVAILABLE', 60, 35, 85, 4.00),
  ('a1000000-0000-0000-0000-000000000005', 'B2', 'LARGE', 'AVAILABLE', 60, 35, 85, 4.00);
