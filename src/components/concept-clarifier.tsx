
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2, Search } from "lucide-react";
import { clarifyCybersecurityConcept } from "@/ai/flows/ai-cybersecurity-concept-clarifier";

export function ConceptClarifier() {
  const [concept, setConcept] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleClarify() {
    if (!concept.trim()) return;
    setLoading(true);
    try {
      const result = await clarifyCybersecurityConcept({ concept });
      setExplanation(result.explanation);
    } catch (error) {
      console.error(error);
      setExplanation("Fehler beim Abrufen der Erklärung. Bitte versuche es später erneut.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-accent/20 bg-accent/5 overflow-hidden">
      <CardHeader className="bg-accent/10 py-3">
        <CardTitle className="text-sm font-headline flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent" />
          AI-Glossar: Was bedeutet...?
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Z.B. Ransomware, MFA..." 
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              className="pl-9 bg-card"
              onKeyDown={(e) => e.key === 'Enter' && handleClarify()}
            />
          </div>
          <Button 
            onClick={handleClarify} 
            disabled={loading || !concept}
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Fragen"}
          </Button>
        </div>
        
        {explanation && (
          <div className="p-3 rounded-lg bg-card border text-sm leading-relaxed animate-in fade-in slide-in-from-top-1">
            <p className="font-bold text-accent mb-1">{concept}:</p>
            {explanation}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
