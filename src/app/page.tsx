
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, Users, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <span className="font-headline font-bold text-xl tracking-tight">Cyberskill Hub</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
            <Button asChild className="rounded-full px-6">
              <Link href="/register">Registrieren</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold mb-6 max-w-4xl mx-auto leading-tight">
              Sichere deine digitale Welt mit <span className="text-primary">Cyberskill Hub</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Professionelle Cybersecurity-Schulung für alle. Lerne Phishing zu erkennen, 
              sichere Passwörter zu erstellen und dich vor Social Engineering zu schützen.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 text-lg h-14 w-full sm:w-auto font-bold shadow-lg shadow-primary/20">
                <Link href="/register">Schulung starten</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-lg h-14 w-full sm:w-auto">
                <Link href="/login">Zum Login</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors group">
                <Lock className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-headline font-bold mb-3">Praxisnahe Module</h3>
                <p className="text-muted-foreground">Strukturierte Lerninhalte, die genau das vermitteln, was im Alltag wichtig ist.</p>
              </div>
              <div className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors group">
                <Users className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-headline font-bold mb-3">Interaktive Aufgaben</h3>
                <p className="text-muted-foreground">Wende dein Wissen sofort an und festige deine Fähigkeiten durch kleine Challenges.</p>
              </div>
              <div className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors group">
                <Zap className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-headline font-bold mb-3">AI Support</h3>
                <p className="text-muted-foreground">Nutze unseren KI-Assistenten, um komplexe Begriffe jederzeit einfach erklärt zu bekommen.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t mt-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <span className="font-headline font-bold tracking-tight">Cyberskill Hub</span>
          </div>
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Cyberskill Hub. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="hover:text-primary">Datenschutz</Link>
            <Link href="#" className="hover:text-primary">Impressum</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
