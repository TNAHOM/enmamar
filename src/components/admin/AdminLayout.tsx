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
        <div className="grid grid-cols-10">
          <div className="p-6 col-span-2">
            <Sidebar />
          </div>
          <main className="p-3 col-span-6">{children}</main>
          <div className="p-6 col-span-2">
            <RecentCustomers />
          </div>
        </div>
      </div>
    </div>
  );
}
