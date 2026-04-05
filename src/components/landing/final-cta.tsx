import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function FinalCTA() {
  return (
    <section className="py-20 px-4 bg-[var(--brand-charcoal)] text-[var(--brand-cream)]">
      <div className="container mx-auto text-center max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Pret a voyager leger ?
        </h2>
        <p className="opacity-70 mb-10 max-w-xl mx-auto leading-relaxed">
          Reservez votre casier en quelques clics et profitez de Bruxelles sans
          vos bagages.
        </p>
        <Link
          href="#emplacements"
          className={cn(
            buttonVariants({ size: "lg", variant: "secondary" }),
            "text-base px-8 py-3"
          )}
        >
          Reserver maintenant
        </Link>
      </div>
    </section>
  );
}
