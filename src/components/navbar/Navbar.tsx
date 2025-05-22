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
    <div className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="w-5/6 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-purple-600 tracking-tight">
                ENMAMAR
              </span>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/become-instructor"
              className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              Become an Instructor
            </Link>

            {/* Conditional Links Based on Role */}
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-200"
              >
                Dashboard
              </Link>
            )}
            {user?.role === "instructor" && (
              <Link
                href="/instructor/dashboard"
                className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-200"
              >
                Dashboard
              </Link>
            )}
            {user?.role === "user" && (
              <Link
                href="/profile"
                className="text-gray-600 hover:text-purple-600 font-medium transition-colors duration-200"
              >
                Profile
              </Link>
            )}

            {/* Auth Section */}
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-purple-600 border-solid rounded-full animate-spin"></div>
              </div>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-medium">
                    {user?.first_name?.charAt(0).toUpperCase()}
                    {user?.last_name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700 font-medium">
                    Hello, {user?.first_name}
                  </span>
                </div>
                <button
                  onClick={() => logout()}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium text-sm transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 border border-purple-600 text-purple-600 hover:bg-purple-50 rounded-md font-medium text-sm transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium text-sm transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button - Would need JS to toggle */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-600 hover:text-purple-600 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Hidden by default */}
      <div className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/explore"
            className="block px-3 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-md"
          >
            Explore
          </Link>
          <Link
            href="/become-instructor"
            className="block px-3 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-md"
          >
            Become an Instructor
          </Link>

          {/* Conditional Links Based on Role */}
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="block px-3 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-md"
            >
              Dashboard
            </Link>
          )}
          {user?.role === "instructor" && (
            <Link
              href="/instructor/dashboard"
              className="block px-3 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-md"
            >
              Dashboard
            </Link>
          )}
          {user?.role === "user" && (
            <Link
              href="/profile"
              className="block px-3 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-md"
            >
              Profile
            </Link>
          )}

          {/* Auth Section */}
          {!isLoading && !isAuthenticated && (
            <>
              <Link
                href="/auth/login"
                className="block px-3 py-2 text-gray-600 hover:bg-purple-50 hover:text-purple-600 rounded-md"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="block px-3 py-2 text-purple-600 font-medium hover:bg-purple-50 rounded-md"
              >
                Sign Up
              </Link>
            </>
          )}

          {!isLoading && isAuthenticated && (
            <button
              onClick={() => logout()}
              className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
