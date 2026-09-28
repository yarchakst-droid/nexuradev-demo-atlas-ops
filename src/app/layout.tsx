import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { LangProvider } from "@/i18n/LangContext";
import { SearchProvider } from "@/lib/search-context";
import { SidebarProvider } from "@/lib/sidebar-context";
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
        <LangProvider>
          <SearchProvider>
            <SidebarProvider>
              <Sidebar />
              <div className="flex min-w-0 flex-1 flex-col">
                <Topbar />
                <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
              </div>
            </SidebarProvider>
          </SearchProvider>
        </LangProvider>
      </body>
    </html>
  );
}
