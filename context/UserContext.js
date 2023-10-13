"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createContext } from "react";

export const UserContext = createContext("");

export default async function Session({ children }) {
  const supabase = createClientComponentClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
