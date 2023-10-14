import NavBar from "@/components/navigation/NavBar";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tickr",
  description: "",
};

export const revalidate = 0;

export default async function RootLayout({ children }) {
  const supabase = createClientComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className="text-white">
        <AuthProvider accessToken={accessToken}>
          <NavBar user={user} />
          <main className="m-4 select-none">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
