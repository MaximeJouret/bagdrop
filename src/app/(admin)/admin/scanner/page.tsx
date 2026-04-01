"use client";

import { useState } from "react";
import { CheckCircle, XCircle, ScanLine, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface ValidationResult {
  valid: boolean;
  action?: "deposit" | "retrieve";
  message?: string;
  error?: string;
  booking?: Record<string, unknown>;
}

export default function ScannerPage() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);

  async function handleValidate(e: React.FormEvent) {
    e.preventDefault();
    if (!token.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/qr/validate?token=${encodeURIComponent(token.trim())}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ valid: false, error: "Erreur de connexion" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-2xl font-bold">Scanner QR Code</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScanLine className="h-5 w-5" />
            Validation manuelle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleValidate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">Token QR code</Label>
              <Input
                id="token"
                placeholder="Collez le token du QR code ici..."
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Le token se trouve dans l&apos;URL du QR code après &quot;token=&quot;
              </p>
            </div>
            <Button className="w-full" disabled={loading || !token.trim()}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Valider
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Result */}
      {result && (
        <Card
          className={
            result.valid
              ? "border-green-200 bg-green-50"
              : "border-red-200 bg-red-50"
          }
        >
          <CardContent className="flex items-center gap-4 py-5">
            {result.valid ? (
              <CheckCircle className="h-10 w-10 text-green-600 shrink-0" />
            ) : (
              <XCircle className="h-10 w-10 text-red-600 shrink-0" />
            )}
            <div>
              <p className="font-semibold text-lg">
                {result.valid ? "Valide" : "Invalide"}
              </p>
              <p className="text-sm">
                {result.message || result.error}
              </p>
              {result.action && (
                <p className="text-sm font-medium mt-1">
                  Action : {result.action === "deposit" ? "Dépôt de bagage" : "Récupération de bagage"}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
