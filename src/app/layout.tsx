import { Inter } from "next/font/google";
import "./globals.css";
import Logo from "./assets/logo";

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
      <body>
        <header>
          <Logo />
        </header>
        {children}
      </body>
    </html>
  );
}
