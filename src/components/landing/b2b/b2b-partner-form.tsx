"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { CheckCircle2, Send } from "lucide-react";

export function B2BPartnerForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Demo submission - would POST to /api/partners in production
    setSubmitted(true);
  }

  return (
    <section
      id="partenariat"
      className="py-20 md:py-24 px-4 bg-background"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: pitch */}
          <div>
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-3">
              Démarrer
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--brand-charcoal)] dark:text-foreground mb-5">
              Quinze minutes pour
              <br />
              <span className="text-primary">transformer votre conciergerie.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Laissez-nous vos coordonnées. Un de nos cofondateurs vous
              recontacte sous 24h pour un appel de cadrage. Pas de commercial
              agressif, pas de force de vente.
            </p>

            <div className="space-y-4 pt-6 border-t border-border/50">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[var(--brand-charcoal)] dark:text-foreground">
                    Période d'essai sans engagement
                  </p>
                  <p className="text-sm text-muted-foreground">
                    30 jours pour évaluer le service avec votre équipe.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[var(--brand-charcoal)] dark:text-foreground">
                    Mise en place en 72h
                  </p>
                  <p className="text-sm text-muted-foreground">
                    De la signature à la première collecte effective.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[var(--brand-charcoal)] dark:text-foreground">
                    Aucun coût d'entrée
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tablette, formation, support : tout est inclus.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <Card className="border-border/50 shadow-lg">
            <CardContent className="p-7">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[var(--brand-charcoal)] dark:text-foreground">
                    Demande reçue
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Un membre de l'équipe BagDrop vous contacte sous 24h
                    ouvrées.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="mb-1.5">
                        Prénom
                      </Label>
                      <Input id="firstName" required placeholder="Sophie" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="mb-1.5">
                        Nom
                      </Label>
                      <Input id="lastName" required placeholder="Lambert" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="hotel" className="mb-1.5">
                      Établissement
                    </Label>
                    <Input
                      id="hotel"
                      required
                      placeholder="Hotel Métropole Bruxelles"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="role" className="mb-1.5">
                        Fonction
                      </Label>
                      <Input
                        id="role"
                        required
                        placeholder="Directeur d'hébergement"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rooms" className="mb-1.5">
                        Nombre de chambres
                      </Label>
                      <Input id="rooms" type="number" placeholder="120" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-1.5">
                      Email professionnel
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="sophie.lambert@hotel.be"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="mb-1.5">
                      Message (optionnel)
                    </Label>
                    <Textarea
                      id="message"
                      rows={3}
                      placeholder="Volume estimé, horaires de réception, particularités..."
                    />
                  </div>
                  <button
                    type="submit"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "w-full mt-2 group"
                    )}
                  >
                    Demander un appel de cadrage
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-xs text-muted-foreground text-center pt-2">
                    Vos données restent confidentielles. Pas de spam, jamais.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
