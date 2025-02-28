"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/auth-store";

const Navbar = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated) {
        // Silent refresh check
        fetch("/api/auth/me").catch(() => logout());
      }
    }, 300000);

    return () => clearInterval(interval);
  }, [isAuthenticated, logout]);

  return (
    <div className="flex justify-between items-center p-4 px-14">
      <div className="text-xl text-orangeStandard font-bold">{"ENMAMAR"}</div>
      <div className="flex justify-between items-center space-x-8 font-medium">
        <p>Explore</p>
        <p>Become an Instructor</p>
        {isLoading ? (
          <p>Loading...</p>
        ) : isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <p>{user?.full_name}</p>
            <button
              onClick={() => logout()}
              className="px-4 py-1 bg-orangeStandard text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <a
              className="text-orangeStandard border border-orangeStandard px-4 py-1"
              href="/auth/login"
            >
              Login
            </a>
            <a
              href="/auth/signup"
              className="px-4 py-1 bg-orangeStandard text-white"
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
