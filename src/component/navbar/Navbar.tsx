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
    <div className="flex justify-between items-center p-4 px-14 bg-[#F6F7F9]">
      <div className="text-xl text-purpleStandard font-bold">{"ENMAMAR"}</div>
      <div className="flex justify-between items-center space-x-8 font-medium">
        <p>Explore</p>
        <p>Become an Instructor</p>
        <Link href={"admin"} >Admin</Link>
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
