"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import Link from "next/link";
import { Menu, X, LogOut } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  showIf?: (
    role: string | undefined,
    isAuth: boolean,
    isLoading: boolean
  ) => boolean;
}

const Navbar = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. Refresh token check every 5 minutes if authenticated
  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated) {
        fetch("/api/me", { credentials: "include" }).catch(() => logout());
      }
    }, 300000); // 300,000 ms = 5 minutes
    return () => clearInterval(interval);
  }, [isAuthenticated, logout]);

  // 2. Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        !(event.target as HTMLElement).closest(".navbar-container")
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // 3. Close mobile menu on navigation
  const handleLinkClick = () => setIsMobileMenuOpen(false);

  // 4. Logout handler (also closes menu if open)
  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  // 5. Define your navigation items (including “About Us”)
  // Each item can specify a 'showIf' predicate that checks (role, isAuth, isLoading).
  const navItems: NavItem[] = [
    {
      label: "Become an Instructor",
      href: "/become-instructor",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      showIf: (_role, _isAuth, _isLoading) => true,
    },
    {
      label: "About Us",
      href: "/about",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      showIf: (_role, _isAuth, _isLoading) => true,
    },
    {
      label: "Admin Dashboard",
      href: "/admin",
      showIf: (role, isAuth, isLoading) =>
        !isLoading && isAuth && role === "admin",
    },
    {
      label: "Dashboard",
      href: "/instructor/dashboard",
      showIf: (role, isAuth, isLoading) =>
        !isLoading && isAuth && role === "instructor",
    },
    {
      label: "Profile",
      href: "/profile",
      showIf: (role, isAuth, isLoading) =>
        !isLoading && isAuth && role === "user",
    },
  ];

  // 6. Loading skeleton for desktop auth section
  const AuthLoadingSkeleton = () => (
    <div className="flex items-center space-x-3">
      <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
      <div className="h-10 w-20 bg-gray-200 rounded-full animate-pulse"></div>
    </div>
  );

  // 7. Loading skeleton for mobile auth section
  const MobileAuthLoadingSkeleton = () => (
    <div className="space-y-2 pt-2">
      <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  );

  // 8. Render the component
  return (
    <nav className="navbar-container sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              onClick={handleLinkClick}
              className="flex items-center"
            >
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
                ENMAMAR
              </span>
            </Link>
          </div>

          {/* === DESKTOP NAVIGATION: Visible on lg+ screens === */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              if (item.showIf?.(user?.role, isAuthenticated, isLoading)) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleLinkClick}
                    className="text-gray-700 hover:text-purple-600 font-medium transition-all duration-200 hover:scale-105"
                  >
                    {item.label}
                  </Link>
                );
              }
              return null;
            })}

            {/* Auth Section on Desktop */}
            {isLoading ? (
              <AuthLoadingSkeleton />
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* Circle avatar with initials */}
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

          {/* === MOBILE: hamburger button (always visible on lg< screens) === */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
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

      {/* === MOBILE MENU OVERLAY: visible only when isMobileMenuOpen === */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100 border-t border-gray-200"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="bg-white shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {/* User info block (only when authenticated & not loading) */}
            {!isLoading && isAuthenticated && user && (
              <div className="flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center font-semibold shadow-md">
                  {user.first_name?.charAt(0).toUpperCase()}
                  {user.last_name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-gray-800 font-medium">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">
                    {user.role}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation links for mobile (same items as desktop list) */}
            {navItems.map((item) => {
              if (item.showIf?.(user?.role, isAuthenticated, isLoading)) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleLinkClick}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 rounded-lg transition-all duration-200 font-medium"
                  >
                    {/* Optionally you can render an icon or bullet here */}
                    {item.label}
                  </Link>
                );
              }
              return null;
            })}

            {/* Auth buttons or logout in mobile */}
            {isLoading ? (
              <MobileAuthLoadingSkeleton />
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
