
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: "Login fehlgeschlagen",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />

      <Card className="w-full max-w-md border-border shadow-2xl relative z-10">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <ShieldCheck className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline font-bold">Willkommen zurück</CardTitle>
          <CardDescription>Logge dich ein, um mit deiner Schulung fortzufahren.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@beispiel.de" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary/30"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Passwort</Label>
                <Link href="#" className="text-xs text-primary hover:underline">Passwort vergessen?</Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-secondary/30"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full font-bold h-11" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Login"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Noch kein Konto?{" "}
              <Link href="/register" className="text-primary font-medium hover:underline">Registrieren</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
