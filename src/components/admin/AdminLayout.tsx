"use client";

import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import RecentCustomers from "./RecentCustomers";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex flex-col min-h-screen">
        <div className="grid grid-cols-[3fr_15fr_3fr]">
          <div className="p-4">
            <Sidebar />
          </div>
          <main className="p-2">{children}</main>
          <div className="p-4">
            <RecentCustomers />
          </div>
        </div>
      </div>
    </div>
  );
}
