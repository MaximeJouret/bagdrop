"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Luggage, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/callback?redirect=${encodeURIComponent(redirect)}`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
    }
  }

  async function handleGoogle() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/callback?redirect=${encodeURIComponent(redirect)}`,
      },
    });
  }

  if (sent) {
    return (
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Mail className="h-12 w-12 mx-auto text-primary mb-2" />
            <CardTitle>Vérifiez votre email</CardTitle>
            <CardDescription>
              Un lien de connexion a été envoyé à <strong>{email}</strong>.
              Cliquez sur le lien dans l&apos;email pour vous connecter.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <button
              onClick={() => setSent(false)}
              className="text-sm text-muted-foreground hover:text-foreground underline w-full text-center"
            >
              Utiliser une autre adresse email
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Luggage className="h-10 w-10 mx-auto text-primary mb-2" />
          <CardTitle className="text-2xl">Connexion à BagDrop</CardTitle>
          <CardDescription>
            Connectez-vous pour réserver un casier
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Google OAuth */}
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogle}
          >
            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continuer avec Google
          </Button>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">ou</span>
            <Separator className="flex-1" />
          </div>

          {/* Magic Link */}
          <form onSubmit={handleMagicLink} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="email">Adresse email</Label>
              <Input
                id="email"
                type="email"
                placeholder="vous@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button className="w-full" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Recevoir un lien de connexion
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center pt-2">
            En vous connectant, vous acceptez nos conditions d&apos;utilisation
            et notre politique de confidentialité.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
