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

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated) {
        fetch("/api/me", { credentials: "include" }).catch(() => logout());
      }
    }, 300000);
    return () => clearInterval(interval);
  }, [isAuthenticated, logout]);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => setIsMobileMenuOpen(false);
  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const navItems: NavItem[] = [
    { label: "Practice", href: "/practice", showIf: () => true },
    { label: "Become an Instructor", href: "/become-instructor", showIf: () => true },
    { label: "About Us", href: "/about", showIf: () => true },
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

  return (
    <nav className="navbar-container sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex-shrink-0">
            <Link
              href="/"
              onClick={handleLinkClick}
              className="flex items-center"
            >
              <span className="font-heading text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                ENMAMAR
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              if (item.showIf?.(user?.role, isAuthenticated, isLoading)) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleLinkClick}
                    className="text-slate-600 hover:text-amber-600 font-medium transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                );
              }
              return null;
            })}

            {isLoading ? (
              <div className="flex items-center space-x-3">
                <div className="h-10 w-24 bg-slate-200 rounded-full animate-pulse" />
                <div className="h-10 w-20 bg-slate-200 rounded-full animate-pulse" />
              </div>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                  <div className="w-8 h-8 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center font-semibold text-sm">
                    {user?.first_name?.charAt(0).toUpperCase()}
                    {user?.last_name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-slate-800 font-medium text-sm">
                    Hello, {user?.first_name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-full font-medium text-sm transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/login"
                  className="px-6 py-2 border-2 border-slate-300 text-slate-700 hover:border-amber-500 hover:text-amber-600 rounded-full font-medium text-sm transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-full text-sm transition-colors duration-200 shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="p-2 text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100 border-t border-slate-200"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="bg-white shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {!isLoading && isAuthenticated && user && (
              <div className="flex items-center space-x-3 bg-slate-50 p-4 rounded-lg mb-4 border border-slate-100">
                <div className="w-10 h-10 bg-amber-500 text-slate-900 rounded-full flex items-center justify-center font-semibold">
                  {user.first_name?.charAt(0).toUpperCase()}
                  {user.last_name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-slate-800 font-medium">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-sm text-slate-500 capitalize">{user.role}</p>
                </div>
              </div>
            )}

            {navItems.map((item) => {
              if (item.showIf?.(user?.role, isAuthenticated, isLoading)) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleLinkClick}
                    className="flex items-center px-4 py-3 text-slate-700 hover:bg-amber-50 hover:text-amber-700 rounded-lg transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                );
              }
              return null;
            })}

            {isLoading ? (
              <div className="space-y-2 pt-2">
                <div className="h-12 bg-slate-200 rounded-lg animate-pulse" />
                <div className="h-12 bg-slate-200 rounded-lg animate-pulse" />
              </div>
            ) : !isAuthenticated ? (
              <div className="space-y-2 pt-2">
                <Link
                  href="/auth/login"
                  onClick={handleLinkClick}
                  className="block w-full px-4 py-3 text-center border-2 border-slate-300 text-slate-700 rounded-lg font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={handleLinkClick}
                  className="block w-full px-4 py-3 text-center bg-amber-500 text-slate-900 font-semibold rounded-lg"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium mt-2"
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
