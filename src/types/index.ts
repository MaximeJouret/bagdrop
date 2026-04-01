export type {
  Database,
  LockerSize,
  LockerStatus,
  BookingStatus,
  PaymentStatus,
  UserRole,
  BookingType,
  DeliveryStatus,
} from "./database";

import type { Database } from "./database";

export type Trailer =
  Database["public"]["Tables"]["trailers"]["Row"];
export type Locker =
  Database["public"]["Tables"]["lockers"]["Row"];
export type Booking =
  Database["public"]["Tables"]["bookings"]["Row"];
export type Profile =
  Database["public"]["Tables"]["profiles"]["Row"];
export type DeliveryRun =
  Database["public"]["Tables"]["delivery_runs"]["Row"];
export type DeliveryPrice =
  Database["public"]["Tables"]["delivery_prices"]["Row"];
