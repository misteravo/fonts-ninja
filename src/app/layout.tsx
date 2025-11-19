import { Inter } from "next/font/google";
import Logo from "../assets/logo";
import "./globals.css";
import { Button } from "../components/button";

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
      <body className="p-12 flex flex-col gap-12">
        <header className="flex flex-row items-center justify-between">
          <Logo />
          <Button>Switch theme</Button>
        </header>
        {children}
      </body>
    </html>
  );
}
