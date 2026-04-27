"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function B2BPartnerForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="partenariat"
      className="py-32 md:py-48 px-6 bg-[var(--brand-cream)] dark:bg-muted/20"
    >
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-16">
          <p className="text-sm text-[var(--brand-cobalt)] mb-4">Démarrer</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] text-[var(--brand-ink)] dark:text-foreground leading-[1.1] mb-6">
            Quinze minutes
            <br />
            <span className="text-muted-foreground">pour transformer votre conciergerie.</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Un cofondateur vous rappelle dans les 24h pour un premier échange.
          </p>
        </div>

        {submitted ? (
          <div className="bg-card border border-border rounded-3xl p-12 text-center">
            <CheckCircle2
              strokeWidth={1.5}
              className="h-12 w-12 text-[var(--brand-cobalt)] mx-auto mb-6"
            />
            <h3 className="text-2xl font-semibold tracking-tight mb-3 text-[var(--brand-ink)] dark:text-foreground">
              Demande reçue
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Un cofondateur vous appelle dans les 24h.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-3xl p-8 md:p-10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="firstName" className="mb-1.5 text-sm">
                  Prénom
                </Label>
                <Input
                  id="firstName"
                  required
                  placeholder="Sophie"
                  className="h-11 rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="mb-1.5 text-sm">
                  Nom
                </Label>
                <Input
                  id="lastName"
                  required
                  placeholder="Lambert"
                  className="h-11 rounded-xl"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="hotel" className="mb-1.5 text-sm">
                Établissement
              </Label>
              <Input
                id="hotel"
                required
                placeholder="Hotel Métropole Bruxelles"
                className="h-11 rounded-xl"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="role" className="mb-1.5 text-sm">
                  Fonction
                </Label>
                <Input
                  id="role"
                  required
                  placeholder="Directeur d'hébergement"
                  className="h-11 rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="rooms" className="mb-1.5 text-sm">
                  Chambres
                </Label>
                <Input
                  id="rooms"
                  type="number"
                  placeholder="120"
                  className="h-11 rounded-xl"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="mb-1.5 text-sm">
                Email pro
              </Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="sophie.lambert@hotel.be"
                className="h-11 rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="message" className="mb-1.5 text-sm">
                Message (optionnel)
              </Label>
              <Textarea
                id="message"
                rows={3}
                placeholder="Volume estimé, horaires de réception, particularités..."
                className="rounded-xl"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full text-base font-medium bg-[var(--brand-cobalt)] text-white hover:bg-[var(--brand-cobalt-deep)] transition-colors group mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-cobalt)] focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              Programmer un échange
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Vos données restent confidentielles. Pas de spam, jamais.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
