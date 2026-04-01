"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { LockerSize } from "@/types";

interface BookingState {
  trailerId: string | null;
  trailerName: string | null;
  trailerAddress: string | null;
  lockerId: string | null;
  lockerLabel: string | null;
  lockerSize: LockerSize | null;
  pricePerHour: number | null;
  startTime: string | null;
  endTime: string | null;
  durationHours: number | null;
  totalPrice: number | null;
}

interface BookingContextType {
  state: BookingState;
  setTrailer: (id: string, name: string, address: string) => void;
  setLocker: (id: string, label: string, size: LockerSize, pricePerHour: number) => void;
  setTimeSlot: (startTime: string, endTime: string, durationHours: number) => void;
  reset: () => void;
}

const initialState: BookingState = {
  trailerId: null,
  trailerName: null,
  trailerAddress: null,
  lockerId: null,
  lockerLabel: null,
  lockerSize: null,
  pricePerHour: null,
  startTime: null,
  endTime: null,
  durationHours: null,
  totalPrice: null,
};

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(initialState);

  function setTrailer(id: string, name: string, address: string) {
    setState((prev) => ({ ...prev, trailerId: id, trailerName: name, trailerAddress: address }));
  }

  function setLocker(id: string, label: string, size: LockerSize, pricePerHour: number) {
    setState((prev) => ({ ...prev, lockerId: id, lockerLabel: label, lockerSize: size, pricePerHour }));
  }

  function setTimeSlot(startTime: string, endTime: string, durationHours: number) {
    setState((prev) => ({
      ...prev,
      startTime,
      endTime,
      durationHours,
      totalPrice: prev.pricePerHour ? prev.pricePerHour * durationHours : null,
    }));
  }

  function reset() {
    setState(initialState);
  }

  return (
    <BookingContext.Provider value={{ state, setTrailer, setLocker, setTimeSlot, reset }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookingFlow() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingFlow must be used within a BookingProvider");
  }
  return context;
}
