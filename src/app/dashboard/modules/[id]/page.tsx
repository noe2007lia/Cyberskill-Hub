"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { modules, Module } from "@/lib/modules";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  CheckCircle2, 
  ChevronRight, 
  Zap, 
  Loader2, 
  HelpCircle
} from "lucide-react";
import Link from "next/link";
import { doc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

export default function ModulePage() {
  const { id } = useParams();
  const router = useRouter();
  const { profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  
  const [module, setModule] = useState<Module | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const mod = modules.find(m => m.id === id);
    if (mod) {
      setModule(mod);
      if (profile?.completedModules.includes(mod.id)) {
        setIsCompleted(true);
      }
    } else {
      router.push("/dashboard");
    }
  }, [id, profile, router]);

  async function handleComplete() {
    if (!profile || !module || isCompleted) return;
    
    setLoading(true);
    try {
      const userRef = doc(db, "users", profile.uid);
      await updateDoc(userRef, {
        completedModules: arrayUnion(module.id),
        points: increment(module.points)
      });
      
      await refreshProfile();
      setIsCompleted(true);
      
      toast({
        title: "Modul abgeschlossen!",
        description: `Du hast ${module.points} Punkte erhalten.`,
      });
    } catch (error) {
      toast({
        title: "Fehler beim Speichern",
        description: "Dein Fortschritt konnte nicht gespeichert werden.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  if (!module || !profile) return null;

  const nextModIndex = modules.findIndex(m => m.id === module.id) + 1;
  const nextModule = nextModIndex < modules.length ? modules[nextModIndex] : null;

  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Navigation & Header */}
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zur Übersicht
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-bold">{module.points} XP verfügbar</span>
        </div>
      </div>

      <Card className="overflow-hidden border-none shadow-2xl bg-card/40 backdrop-blur-sm">
        <div className="relative h-64 md:h-80 w-full">
          <Image 
            src={module.imageUrl || "https://placehold.co/600x400.png"} 
            alt={module.title}
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">{module.title}</h1>
            <p className="text-muted-foreground md:text-lg">{module.description}</p>
          </div>
        </div>

        <CardContent className="pt-8 space-y-10">
          {/* Main Content */}
          <div className="prose prose-invert max-w-none">
            <div className="p-6 rounded-2xl bg-secondary/30 border border-border/50 leading-relaxed text-lg">
              {module.content}
            </div>
          </div>

          {/* Static Task */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary">
              <h3 className="text-xl font-headline font-bold">Modul Aufgabe</h3>
            </div>
            
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  {module.task}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="Schreibe hier deine Antwort..." 
                  className="min-h-[120px] bg-background/50 border-primary/20 focus-visible:ring-primary"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </CardContent>
            </Card>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between items-center p-8 border-t bg-secondary/10">
          <div className="flex items-center gap-2">
            {isCompleted ? (
              <div className="flex items-center gap-2 text-green-500 font-bold">
                <CheckCircle2 className="w-6 h-6" />
                <span>Abgeschlossen</span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">Beantworte die Frage, um das Modul abzuschließen.</p>
            )}
          </div>
          
          <div className="flex gap-4 w-full sm:w-auto">
            {!isCompleted ? (
              <Button 
                onClick={handleComplete} 
                disabled={loading || !answer.trim()}
                className="w-full sm:w-auto font-bold px-8 h-12 text-lg shadow-lg shadow-primary/20"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Als erledigt markieren"}
              </Button>
            ) : (
              nextModule ? (
                <Button asChild className="w-full sm:w-auto font-bold px-8 h-12 text-lg">
                  <Link href={`/dashboard/modules/${nextModule.id}`}>
                    Nächstes Modul
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="outline" className="w-full sm:w-auto font-bold px-8 h-12 text-lg">
                  <Link href="/dashboard">
                    Schulung beenden
                  </Link>
                </Button>
              )
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}