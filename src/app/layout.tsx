import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { AuthProvider } from "@/lib/AuthProvider";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";


export const metadata: Metadata = {
  title: "Enmamar.com",
  description: "Ethiopian course platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <AuthProvider>
          <Navbar />
        </AuthProvider>
        <Toaster position="top-center" richColors />
        {children}
        <Footer />
      </body>
    </html>
  );
}
