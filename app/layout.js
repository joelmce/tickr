import NavBar from "@/components/navigation/NavBar";
import "./globals.css";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthProvider from "@/components/AuthProvider";
import { Inconsolata } from "next/font/google";
import ProgressBar from "@/app/Providers";
import Providers from "@/app/Providers";
import Link from "next/link";

export const metadata = {
  title: "Tickr",
  description: "",
};

const roboto = Inconsolata({ weight: "300", subsets: ["latin"] });

export const revalidate = 0;

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang="en" className={roboto.className}>
      <body className="text-white">
        <Providers>
          <AuthProvider accessToken={accessToken}>
            <NavBar user={session?.user} />
            <main className="mx-14 my-14 select-none">{children}</main>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
