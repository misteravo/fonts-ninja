import { ThemeButton } from "@/components/theme-button";
import { ThemeProvider } from "@/providers/theme-provider";
import { Inter } from "next/font/google";
import Logo from "../assets/logo";
import "./globals.css";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <ThemeProvider>
        <body className="px-14 py-9.25 flex flex-col gap-14">
          <header className="flex flex-row items-center justify-between">
            <Link href="/">
              <Logo />
            </Link>
            <ThemeButton />
          </header>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
