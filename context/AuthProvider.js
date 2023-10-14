"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ accessToken, children }) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
      setSession(session);
    });

    return () => {
      authListener.unsubscribe();
    };
  }, [accessToken, supabase, router]);
  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
}
