
"use client";

import { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowLeft, Users, Trophy, BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { modules } from "@/lib/modules";
import Link from "next/link";

interface Learner {
  uid: string;
  email: string;
  displayName: string;
  completedModules: string[];
  points: number;
}

export default function AdminPage() {
  const { profile, loading: authLoading } = useAuth();
  const [learners, setLearners] = useState<Learner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && (!profile || profile.role !== 'admin')) {
      router.push("/dashboard");
    } else if (profile?.role === 'admin') {
      fetchLearners();
    }
  }, [profile, authLoading, router]);

  async function fetchLearners() {
    setLoading(true);
    try {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const learnersData: Learner[] = [];
      querySnapshot.forEach((doc) => {
        learnersData.push(doc.data() as Learner);
      });
      setLearners(learnersData);
    } catch (error) {
      console.error("Error fetching learners:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredLearners = learners.filter(l => 
    l.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalModules = modules.length;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <ShieldCheck className="w-12 h-12 text-primary animate-pulse" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold mb-2 flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-primary" />
            Coach-Dashboard
          </h1>
          <p className="text-muted-foreground">Verwalte und überwache den Fortschritt deiner Lernenden.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zum Learner-Bereich
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-secondary/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-wider font-bold">Lernende Gesamt</CardDescription>
            <CardTitle className="text-3xl font-headline flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              {learners.length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-secondary/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-wider font-bold">Module abgeschlossen</CardDescription>
            <CardTitle className="text-3xl font-headline flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-accent" />
              {learners.reduce((acc, curr) => acc + curr.completedModules.length, 0)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-secondary/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-wider font-bold">Durchschnitts-Fortschritt</CardDescription>
            <CardTitle className="text-3xl font-headline flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              {learners.length > 0 
                ? Math.round((learners.reduce((acc, curr) => acc + curr.completedModules.length, 0) / (learners.length * totalModules)) * 100) 
                : 0}%
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Learners Table */}
      <Card className="border-border">
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="font-headline">Lernende Übersicht</CardTitle>
            <CardDescription>Details zu den einzelnen Schulungsteilnehmern.</CardDescription>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Suchen..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow>
                  <TableHead className="font-bold">Name</TableHead>
                  <TableHead className="font-bold">Email</TableHead>
                  <TableHead className="font-bold">Module</TableHead>
                  <TableHead className="font-bold">Fortschritt</TableHead>
                  <TableHead className="font-bold">XP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLearners.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground italic">
                      Keine Lernenden gefunden.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLearners.map((learner) => {
                    const progressPercent = Math.round((learner.completedModules.length / totalModules) * 100);
                    const isDone = learner.completedModules.length === totalModules;
                    
                    return (
                      <TableRow key={learner.uid}>
                        <TableCell className="font-medium">{learner.displayName || "Anonym"}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{learner.email}</TableCell>
                        <TableCell>
                          <Badge variant={isDone ? "default" : "outline"} className={isDone ? "bg-green-500/80 border-none" : ""}>
                            {learner.completedModules.length} / {totalModules}
                          </Badge>
                        </TableCell>
                        <TableCell className="min-w-[150px]">
                          <div className="space-y-1">
                            <Progress value={progressPercent} className="h-2" />
                            <span className="text-[10px] font-bold text-muted-foreground">{progressPercent}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-bold text-primary">{learner.points} XP</span>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
