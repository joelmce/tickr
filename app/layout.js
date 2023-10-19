import NavBar from "@/components/navigation/NavBar";
import "./globals.css";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "Tickr",
  description: "",
};

export const revalidate = 0;

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang="en">
      <body className="text-white">
        <AuthProvider accessToken={accessToken}>
          <NavBar user={session?.user} />
          <main className="m-4 select-none">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
