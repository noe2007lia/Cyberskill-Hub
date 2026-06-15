
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: "learner" | "admin";
  completedModules: string[];
  points: number;
}

interface AuthContextType {
  user: { uid: string; email: string; displayName: string } | null;
  profile: UserProfile | null;
  loading: boolean;
  completeModule: (moduleId: string, points: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ uid: string; email: string; displayName: string } | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockUserStr = localStorage.getItem("mock-user");
    const storedProfileStr = localStorage.getItem("user-profile");

    if (mockUserStr) {
      try {
        const mockData = JSON.parse(mockUserStr);
        setUser({ uid: mockData.uid, email: mockData.email, displayName: mockData.displayName });
        
        if (storedProfileStr) {
          setProfile(JSON.parse(storedProfileStr));
        } else {
          const initialProfile: UserProfile = {
            uid: mockData.uid,
            email: mockData.email,
            displayName: mockData.displayName,
            role: mockData.role || "learner",
            completedModules: [],
            points: 0
          };
          setProfile(initialProfile);
          localStorage.setItem("user-profile", JSON.stringify(initialProfile));
        }
      } catch (e) {
        localStorage.removeItem("mock-user");
        localStorage.removeItem("user-profile");
      }
    }
    setLoading(false);
  }, []);

  const completeModule = (moduleId: string, points: number) => {
    if (!profile) return;
    
    // Prevent double counting if already completed
    if (profile.completedModules.includes(moduleId)) return;

    const updatedProfile: UserProfile = {
      ...profile,
      completedModules: [...profile.completedModules, moduleId],
      points: profile.points + points
    };
    
    setProfile(updatedProfile);
    localStorage.setItem("user-profile", JSON.stringify(updatedProfile));
  };

  const logout = () => {
    localStorage.removeItem("mock-user");
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, completeModule, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
