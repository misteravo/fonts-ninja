import { ThemeButton } from "@/components/theme-button";
import { ThemeProvider, ThemeValue } from "@/providers/theme-provider";
import { Inter } from "next/font/google";
import Logo from "../assets/logo";
import "./globals.css";
import Link from "next/link";
import { cookies } from "next/headers";
import { cn } from "@/utils/classnames";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  let theme = cookieStore.get("theme")?.value as string | undefined;
  if (theme && !["light", "dark"].includes(theme)) theme = undefined;

  return (
    <ThemeProvider theme={theme as ThemeValue}>
      <html
        lang="en"
        className={cn(inter.className, theme === "dark" && "dark")}
      >
        <body className="px-14 pt-9.25 pb-46.25 flex flex-col gap-14">
          <header className="flex flex-row items-center justify-between">
            <Link href="/">
              <Logo />
            </Link>
            <ThemeButton />
          </header>
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
