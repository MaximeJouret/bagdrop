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
      className="py-24 md:py-32 px-6 bg-background"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-[var(--brand-cobalt)] mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-[var(--brand-cobalt)]" />
              Démarrer
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] text-[var(--brand-ink)] dark:text-foreground leading-[1.02] mb-8">
              Quinze minutes
              <br />
              <span className="highlight text-[var(--brand-ink)] dark:text-foreground">pour transformer</span>
              <br />
              votre conciergerie.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Laissez-nous vos coordonnées. Un de nos cofondateurs vous
              recontacte sous 24h pour un appel de cadrage. Pas de commercial
              agressif, pas de force de vente.
            </p>

            <div className="space-y-5">
              {[
                {
                  t: "Période d'essai sans engagement",
                  d: "30 jours pour évaluer le service avec votre équipe.",
                },
                {
                  t: "Mise en place en 72h",
                  d: "De la signature à la première collecte effective.",
                },
                {
                  t: "Aucun coût d'entrée",
                  d: "Tablette, formation, support : tout est inclus.",
                },
              ].map((item) => (
                <div key={item.t} className="flex items-start gap-4">
                  <CheckCircle2
                    strokeWidth={1.5}
                    className="h-5 w-5 text-[var(--brand-cobalt)] shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="font-semibold text-[var(--brand-ink)] dark:text-foreground">
                      {item.t}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[var(--brand-cream)] border border-border rounded-2xl p-8 md:p-10">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-14 h-14 rounded-full bg-[var(--brand-cobalt)]/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2
                      strokeWidth={1.5}
                      className="h-7 w-7 text-[var(--brand-cobalt)]"
                    />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-3 text-[var(--brand-ink)] dark:text-foreground">
                    Demande reçue
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Un membre de l'équipe BagDrop vous contacte sous 24h
                    ouvrées.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="firstName" className="mb-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        Prénom
                      </Label>
                      <Input
                        id="firstName"
                        required
                        placeholder="Sophie"
                        className="h-11 rounded-lg bg-card"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="mb-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        Nom
                      </Label>
                      <Input
                        id="lastName"
                        required
                        placeholder="Lambert"
                        className="h-11 rounded-lg bg-card"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="hotel" className="mb-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                      Établissement
                    </Label>
                    <Input
                      id="hotel"
                      required
                      placeholder="Hotel Métropole Bruxelles"
                      className="h-11 rounded-lg bg-card"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="role" className="mb-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        Fonction
                      </Label>
                      <Input
                        id="role"
                        required
                        placeholder="Directeur d'hébergement"
                        className="h-11 rounded-lg bg-card"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rooms" className="mb-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        Chambres
                      </Label>
                      <Input
                        id="rooms"
                        type="number"
                        placeholder="120"
                        className="h-11 rounded-lg bg-card"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                      Email professionnel
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="sophie.lambert@hotel.be"
                      className="h-11 rounded-lg bg-card"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="mb-1.5 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                      Message (optionnel)
                    </Label>
                    <Textarea
                      id="message"
                      rows={3}
                      placeholder="Volume estimé, horaires de réception, particularités..."
                      className="rounded-lg bg-card"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full h-12 px-6 rounded-full text-base font-semibold bg-[var(--brand-cobalt)] text-white hover:bg-[var(--brand-cobalt-deep)] transition-colors group mt-2"
                  >
                    Demander un appel de cadrage
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-xs text-muted-foreground text-center">
                    Vos données restent confidentielles. Pas de spam, jamais.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
