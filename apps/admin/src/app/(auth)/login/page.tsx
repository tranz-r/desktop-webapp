"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [infoMsg, setInfoMsg] = React.useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  async function onSendCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setInfoMsg(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      setSent(true);
      setInfoMsg("We sent a 6-digit code to your email.");
    } catch (err) {
      console.error(err);
      setErrorMsg("Unable to send code. Ensure the admin account exists and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function onVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    try {
      const { error } = await supabase.auth.verifyOtp({ email, token: code, type: "email" });
      if (error) throw error;
      router.replace("/dashboard");
    } catch (err) {
      console.error(err);
      setErrorMsg("Invalid or expired code. Please re-enter the code or request a new one.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Admin Sign In</CardTitle>
          <CardDescription>Enter email to receive a one-time code</CardDescription>
        </CardHeader>
        <CardContent>
          {!sent ? (
            <form onSubmit={onSendCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required disabled={loading} value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              {errorMsg ? <p className="text-sm text-destructive">{errorMsg}</p> : null}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Sending…" : "Send code"}
              </Button>
            </form>
          ) : (
            <form onSubmit={onVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Enter code</Label>
                <Input id="code" inputMode="numeric" pattern="[0-9]*" required disabled={loading} value={code} onChange={(e) => setCode(e.target.value)} />
                <p className="text-xs text-muted-foreground">We sent a 6-digit code to {email}</p>
              </div>
              {infoMsg ? <p className="text-xs text-muted-foreground">{infoMsg}</p> : null}
              {errorMsg ? <p className="text-sm text-destructive">{errorMsg}</p> : null}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Verifying…" : "Verify & continue"}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setSent(false)} className="w-full">
                Use a different email
              </Button>
              <Button type="button" variant="secondary" disabled={loading} onClick={onSendCode} className="w-full">
                Resend code
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


