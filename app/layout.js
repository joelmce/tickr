import NavBar from "@/components/navigation/NavBar";
import "./globals.css";
import { Inter } from "next/font/google";
import Session from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tickr",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-white">
        <Session>
          <NavBar />
          <main className="m-4 select-none">{children}</main>
        </Session>
      </body>
    </html>
  );
}
