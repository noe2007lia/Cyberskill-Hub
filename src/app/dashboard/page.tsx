"use client";

import { useAuth } from "@/context/AuthContext";
import { modules } from "@/lib/modules";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Award, Trophy, ExternalLink, LayoutDashboard, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ConceptClarifier } from "@/components/concept-clarifier";
import { KAHOOT_LINK } from "@/lib/modules";

export default function Dashboard() {
  const { profile } = useAuth();
  
  if (!profile) return null;

  const completedCount = profile.completedModules.length;
  const totalCount = modules.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);
  const isAllFinished = completedCount === totalCount;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Progress Summary */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-primary/20 bg-gradient-to-br from-card to-secondary/20">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Dein Fortschritt</CardTitle>
            <CardDescription>Du hast {completedCount} von {totalCount} Modulen abgeschlossen.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{progressPercent}% Abgeschlossen</span>
                <span className="text-muted-foreground">{completedCount} / {totalCount} Module</span>
              </div>
              <Progress value={progressPercent} className="h-3" />
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-xl">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Punkte</div>
                  <div className="text-lg font-headline font-bold">{profile.points} XP</div>
                </div>
              </div>
              {isAllFinished && (
                <div className="flex items-center gap-2 bg-accent/20 border border-accent/30 px-4 py-2 rounded-xl animate-bounce">
                  <Award className="w-5 h-5 text-accent" />
                  <span className="text-sm font-bold text-accent">Abschluss-Badge erhalten!</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* AI Tool Mini */}
        <ConceptClarifier />
      </section>

      {/* Modules List */}
      <section>
        <h2 className="text-2xl font-headline font-bold mb-6 flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-primary" />
          Lernmodule
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((mod, idx) => {
            const isCompleted = profile.completedModules.includes(mod.id);
            
            return (
              <Card key={mod.id} className={`group overflow-hidden border-border/50 hover:border-primary/50 transition-all ${isCompleted ? 'bg-secondary/20' : ''}`}>
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={mod.imageUrl || "https://placehold.co/600x400.png"} 
                    alt={mod.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  {isCompleted && (
                    <Badge className="absolute top-4 right-4 bg-green-500/90 text-white border-none">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Erledigt
                    </Badge>
                  )}
                  <Badge variant="outline" className="absolute top-4 left-4 bg-background/50 backdrop-blur-sm">
                    Modul {idx + 1}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="font-headline font-bold text-xl">{mod.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{mod.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between items-center border-t border-border/50 pt-6">
                  <span className="text-sm font-medium text-muted-foreground flex items-center">
                    <Zap className="w-4 h-4 mr-1 text-primary" /> {mod.points} Punkte
                  </span>
                  <Button asChild size="sm" variant={isCompleted ? "secondary" : "default"} className="font-bold">
                    <Link href={`/dashboard/modules/${mod.id}`}>
                      {isCompleted ? "Wiederholen" : "Starten"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Final Quiz Section (Only visible when everything else is done) */}
      {isAllFinished && (
        <Card className="border-accent bg-accent/10 py-8 text-center animate-in zoom-in duration-700">
          <CardHeader>
            <CardTitle className="text-3xl font-headline font-bold text-accent">Gratulation!</CardTitle>
            <CardDescription className="text-lg">Du hast die gesamte Schulung gemeistert. Bist du bereit für den Endgegner?</CardDescription>
          </CardHeader>
          <CardContent>
            <Award className="w-24 h-24 mx-auto text-accent mb-6 animate-pulse" />
            <p className="max-w-md mx-auto mb-8 text-muted-foreground">
              Nimm jetzt am Kahoot-Quiz teil und beweise dein Wissen im Wettbewerb mit anderen Lernenden.
            </p>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold h-14 px-10 text-xl rounded-full shadow-xl shadow-accent/20">
              <Link href={KAHOOT_LINK} target="_blank">
                Zum Kahoot-Quiz
                <ExternalLink className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
