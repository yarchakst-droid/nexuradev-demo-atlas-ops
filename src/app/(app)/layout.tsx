import type { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { SearchProvider } from "@/lib/search-context";
import { SidebarProvider } from "@/lib/sidebar-context";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SearchProvider>
      <SidebarProvider>
        <div className="flex h-full w-full min-w-0">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <Topbar />
            <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </SearchProvider>
  );
}
