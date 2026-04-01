export type {
  Database,
  LockerSize,
  LockerStatus,
  BookingStatus,
  PaymentStatus,
  UserRole,
} from "./database";

export type Trailer =
  Database["public"]["Tables"]["trailers"]["Row"];
export type Locker =
  Database["public"]["Tables"]["lockers"]["Row"];
export type Booking =
  Database["public"]["Tables"]["bookings"]["Row"];
export type Profile =
  Database["public"]["Tables"]["profiles"]["Row"];

import type { Database } from "./database";
