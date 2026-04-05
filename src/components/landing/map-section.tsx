import { DynamicMap } from "@/components/map/dynamic-map";
import { DEMO_TRAILERS } from "@/data/demo-trailers";

export function MapSection() {
  return (
    <section id="emplacements" className="py-16 px-4 bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
            Nos emplacements a Bruxelles
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            5 points de depot strategiques pres des lieux les plus visites.
            Cliquez sur un marqueur pour reserver.
          </p>
        </div>
        <div className="h-[450px] md:h-[550px] rounded-xl overflow-hidden border shadow-sm">
          <DynamicMap trailers={DEMO_TRAILERS} />
        </div>
      </div>
    </section>
  );
}
