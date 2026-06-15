
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: "learner" | "admin";
  completedModules: string[];
  points: number;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (uid: string) => {
    // Only try to fetch from Firestore if it's not the mock admin
    if (uid === "admin-123") {
      setProfile({
        uid: "admin-123",
        email: "admin@cyberskill.hub",
        displayName: "Administrator",
        role: "admin",
        completedModules: [],
        points: 999
      });
      return;
    }

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data() as UserProfile);
      } else {
        const newProfile: UserProfile = {
          uid,
          email: user?.email || "",
          displayName: user?.displayName || "Learner",
          role: "learner",
          completedModules: [],
          points: 0
        };
        await setDoc(docRef, newProfile);
        setProfile(newProfile);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.uid);
  };

  useEffect(() => {
    // 1. Check for mock login first
    const mockUserStr = localStorage.getItem("mock-user");
    if (mockUserStr) {
      try {
        const mockData = JSON.parse(mockUserStr);
        setUser({ uid: mockData.uid, email: mockData.email, displayName: mockData.displayName } as any);
        setProfile({
          uid: mockData.uid,
          email: mockData.email,
          displayName: mockData.displayName,
          role: mockData.role,
          completedModules: [],
          points: 999
        });
        setLoading(false);
        return;
      } catch (e) {
        localStorage.removeItem("mock-user");
      }
    }

    // 2. Fallback to Firebase
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setUser(fbUser);
        await fetchProfile(fbUser.uid);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, refreshProfile }}>
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
