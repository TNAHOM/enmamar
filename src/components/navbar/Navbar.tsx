"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import Link from "next/link";
import { Menu, X, User, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated) {
        // check refresh
        fetch("/api/me", { credentials: "include" }).catch(() => logout());
      }
    }, 300000);
    return () => clearInterval(interval);
  }, [isAuthenticated, logout]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as HTMLElement).closest(".navbar-container")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar-container sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="w-4/6 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center"
              onClick={handleLinkClick}
            >
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
                ENMAMAR
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/become-instructor"
              className="text-gray-700 hover:text-purple-600 font-medium transition-all duration-200 hover:scale-105"
            >
              Become an Instructor
            </Link>

            {/* Role-based Navigation */}
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="text-gray-700 hover:text-purple-600 font-medium transition-all duration-200 hover:scale-105"
              >
                Admin Dashboard
              </Link>
            )}
            {user?.role === "instructor" && (
              <Link
                href="/instructor/dashboard"
                className="text-gray-700 hover:text-purple-600 font-medium transition-all duration-200 hover:scale-105"
              >
                Dashboard
              </Link>
            )}
            {user?.role === "user" && (
              <Link
                href="/profile"
                className="text-gray-700 hover:text-purple-600 font-medium transition-all duration-200 hover:scale-105"
              >
                Profile
              </Link>
            )}

            {/* Auth Section */}
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-t-2 border-purple-600 border-solid rounded-full animate-spin"></div>
              </div>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-full">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm shadow-md">
                    {user?.first_name?.charAt(0).toUpperCase()}
                    {user?.last_name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-800 font-medium text-sm">
                    Hello, {user?.first_name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/login"
                  className="px-6 py-2 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 rounded-full font-medium text-sm transition-all duration-200 hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100 border-t border-gray-200"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="bg-white shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {/* User Info Section for Mobile */}
            {isAuthenticated && user && (
              <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center font-semibold shadow-md">
                  {user?.first_name?.charAt(0).toUpperCase()}
                  {user?.last_name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-gray-800 font-medium">
                    {user?.first_name} {user?.last_name}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <Link
              href="/become-instructor"
              onClick={handleLinkClick}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 rounded-lg transition-all duration-200 font-medium"
            >
              <User className="h-5 w-5 mr-3" />
              Become an Instructor
            </Link>

            {/* Role-based Navigation */}
            {user?.role === "admin" && (
              <Link
                href="/admin"
                onClick={handleLinkClick}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 rounded-lg transition-all duration-200 font-medium"
              >
                <div className="h-5 w-5 mr-3 bg-purple-500 rounded text-white flex items-center justify-center text-xs font-bold">
                  A
                </div>
                Admin Dashboard
              </Link>
            )}
            {user?.role === "instructor" && (
              <Link
                href="/instructor/dashboard"
                onClick={handleLinkClick}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 rounded-lg transition-all duration-200 font-medium"
              >
                <div className="h-5 w-5 mr-3 bg-blue-500 rounded text-white flex items-center justify-center text-xs font-bold">
                  I
                </div>
                Dashboard
              </Link>
            )}
            {user?.role === "user" && (
              <Link
                href="/profile"
                onClick={handleLinkClick}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 rounded-lg transition-all duration-200 font-medium"
              >
                <User className="h-5 w-5 mr-3" />
                Profile
              </Link>
            )}

            {/* Auth Section */}
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <div className="w-6 h-6 border-t-2 border-purple-600 border-solid rounded-full animate-spin"></div>
                <span className="ml-2 text-gray-600">Loading...</span>
              </div>
            ) : !isAuthenticated ? (
              <div className="space-y-2 pt-2">
                <Link
                  href="/auth/login"
                  onClick={handleLinkClick}
                  className="block w-full px-4 py-3 text-center border-2 border-purple-600 text-purple-600 hover:bg-purple-50 rounded-lg font-medium transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={handleLinkClick}
                  className="block w-full px-4 py-3 text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium transition-all duration-200 shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium mt-2"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
