
"use client";

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, LogOut, LayoutDashboard, User, Settings, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <ShieldCheck className="w-12 h-12 text-primary animate-pulse" />
      </div>
    );
  }

  if (!user) return null;

  async function handleLogout() {
    await signOut(auth);
    router.push("/");
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <header className="border-b bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-primary" />
            <span className="font-headline font-bold text-lg hidden sm:inline-block">Cyberskill Hub</span>
          </Link>
          
          <div className="flex items-center gap-2 md:gap-4">
            {profile?.role === 'admin' && (
              <Button asChild variant="ghost" size="sm" className="hidden sm:flex text-accent hover:text-accent">
                <Link href="/admin">
                  <ShieldAlert className="w-4 h-4 mr-2" />
                  Coach-Bereich
                </Link>
              </Button>
            )}
            <div className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-full">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-medium max-w-[100px] truncate">{profile?.displayName}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout" className="text-muted-foreground hover:text-destructive">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 container mx-auto px-4 py-8">
        <main className="flex-1 w-full max-w-5xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </AuthProvider>
  );
}
