import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { LangProvider } from "@/i18n/LangContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atlas Ops - диспетчерська панель",
  description:
    "Atlas Ops - внутрішня диспетчерська панель логістичної компанії: відправлення, маршрути та водії.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk" className={`${inter.variable} ${jetbrains.variable} h-full`}>
      <body className="flex h-full bg-bg text-text antialiased">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
