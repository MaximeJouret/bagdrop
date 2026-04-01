import { BookingProvider } from "@/hooks/use-booking-flow";
import { BookingStepper } from "@/components/booking/booking-stepper";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BookingProvider>
      <div className="container mx-auto px-4 py-4 max-w-3xl">
        <BookingStepper />
        {children}
      </div>
    </BookingProvider>
  );
}
