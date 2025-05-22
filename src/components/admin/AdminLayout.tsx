'use client';
import { RecentCustomers } from "./RecentCustomers";
import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";

// Main Layout Component
interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <div className="flex items-center justify-between p-4 border-b lg:hidden">
        <button
          aria-label="Open sidebar"
          className="text-gray-700 focus:outline-none"
          onClick={() => setSidebarOpen(true)}
        >

          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <span className="font-semibold text-lg">Admin Panel</span>
        <div style={{ width: 40 }} />
      </div>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[250px_1fr_300px] xl:grid-cols-[280px_1fr_320px] gap-0">

          <div className="hidden lg:block lg:p-4">
            <Sidebar />
          </div>


          {sidebarOpen && (
            <div className="fixed inset-0 z-40 flex lg:hidden">

              <div
                className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar overlay"
              />
              {/* Sidebar panel */}
              <div className="relative w-64 max-w-full bg-white shadow-lg h-full z-50">
                <button
                  aria-label="Close sidebar"
                  className="absolute top-3 right-3 text-gray-700 focus:outline-none"
                  onClick={() => setSidebarOpen(false)}
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6"/>
                  </svg>
                </button>
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              </div>
            </div>
          )}

          <div className="p-2 sm:p-4 lg:p-4 order-first lg:order-last">
            {children}
          </div>

          <div className="p-2 sm:p-4 lg:p-4 order-first lg:order-last">
            <RecentCustomers />
          </div>
        </div>
      </div>
    </div>
  );
}
