"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import Link from "next/link";

const Navbar = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated) {
        // check refresh
        fetch("/api/me", { credentials: "include" }).catch(() => logout());
      }
    }, 300000);

    return () => clearInterval(interval);
  }, [isAuthenticated, logout]);

  return (
    <div className="flex justify-between items-center p-4 px-14 bg-[#F6F7F9] text-gray-600 sticky top-0 z-50 border-b h-20">
      <div className="text-xl text-purpleStandard font-bold">
        <Link href={"/"}>ENMAMAR</Link>
      </div>
      <div className="flex justify-between items-center space-x-8 font-medium text-lg">
        <p>Explore</p>
        <Link href={"/become-instructor"}>Become an Instructor</Link>
        {user?.role === "admin" && <Link href={"/admin"}>Admin</Link>}
        {user?.role === "instructor" && (
          <Link href={"/instructor/dashboard"}>Dashboard</Link>
        )}
        {user?.role === "user" && <Link href={"/profile"}>Profile</Link>}
        {isLoading ? (
          <p>Loading...</p>
        ) : isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <p>{user?.first_name}</p>
            <button
              onClick={() => logout()}
              className="px-4 py-1 bg-purpleStandard text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <a
              className="text-purpleStandard border border-purpleStandard px-4 py-1"
              href="/auth/login"
            >
              Login
            </a>
            <a
              href="/auth/signup"
              className="px-4 py-1 bg-purpleStandard text-white"
            >
              SignUp
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
