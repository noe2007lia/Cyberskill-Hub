export interface Module {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  task: string;
  points: number;
}

export const modules: Module[] = [
  {
    id: "m1",
    title: "Einführung in Cybersecurity",
    description: "Lerne die Grundlagen der digitalen Sicherheit kennen.",
    content: "Cybersecurity schützt unsere vernetzten Systeme vor Angriffen. In diesem Modul erfährst du, warum Informationssicherheit für jeden von uns heute überlebenswichtig ist.",
    imageUrl: "https://picsum.photos/seed/cyber1/800/600",
    task: "Was ist das Hauptziel von Cybersecurity?",
    points: 10
  },
  {
    id: "m2",
    title: "Phishing erkennen",
    description: "Lass dich nicht ködern. Erkenne betrügerische E-Mails.",
    content: "Phishing ist eine Methode, bei der Angreifer versuchen, sensible Daten wie Passwörter oder Kreditkartennummern zu stehlen, indem sie sich als vertrauenswürdige Instanz ausgeben.",
    imageUrl: "https://picsum.photos/seed/phishing/800/600",
    task: "Nenne ein typisches Merkmal einer Phishing-Mail.",
    points: 20
  },
  {
    id: "m3",
    title: "Sichere Passwörter",
    description: "Erstelle unknackbare Zugangsdaten.",
    content: "Ein Passwort ist oft die einzige Barriere zwischen einem Hacker und deinen privaten Daten. Erfahre, wie du komplexe Passwörter erstellst und sicher verwaltest.",
    imageUrl: "https://picsum.photos/seed/pass/800/600",
    task: "Wie lang sollte ein sicheres Passwort mindestens sein?",
    points: 15
  },
  {
    id: "m4",
    title: "Social Engineering",
    description: "Die Manipulation des Faktors Mensch.",
    content: "Social Engineering nutzt menschliche Schwächen wie Vertrauen oder Hilfsbereitschaft aus, um an Informationen zu gelangen. Technik allein reicht nicht aus.",
    imageUrl: "https://picsum.photos/seed/social/800/600",
    task: "Warum ist Social Engineering so gefährlich?",
    points: 20
  },
  {
    id: "m5",
    title: "Wiederholung und Quiz",
    description: "Überprüfe dein gesamtes Wissen.",
    content: "Herzlichen Glückwunsch! Du hast fast alle Module abgeschlossen. In diesem Bereich fassen wir die wichtigsten Punkte zusammen, bevor du zum finalen Kahoot-Quiz gehst.",
    imageUrl: "https://picsum.photos/seed/quiz/800/600",
    task: "Bist du bereit für das Abschluss-Quiz?",
    points: 35
  }
];

export const KAHOOT_LINK = "https://create.kahoot.it/share/cybersecurity-schulung/fea73928-f7c6-4996-9471-51d1f30ca16f";
