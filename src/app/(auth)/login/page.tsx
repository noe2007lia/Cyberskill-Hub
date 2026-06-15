
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Hardcoded simple login check
    if (username === "admin" && password === "12345678") {
      // Set a mock session in localStorage for the AuthContext to pick up
      const mockUser = {
        uid: "admin-123",
        email: "admin@cyberskill.hub",
        displayName: "Administrator",
        role: "admin"
      };
      localStorage.setItem("mock-user", JSON.stringify(mockUser));
      
      toast({
        title: "Login erfolgreich",
        description: "Willkommen im Dashboard.",
      });
      
      router.push("/dashboard");
    } else {
      toast({
        title: "Login fehlgeschlagen",
        description: "Login failed. Please check username and password.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
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
          <CardTitle className="text-2xl font-headline font-bold">Test-Login</CardTitle>
          <CardDescription>Nutze die Test-Zugangsdaten (admin / 12345678).</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Benutzername</Label>
              <Input 
                id="username" 
                type="text" 
                placeholder="admin" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-secondary/30"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Passwort</Label>
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
              Demo-Modus aktiv.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
