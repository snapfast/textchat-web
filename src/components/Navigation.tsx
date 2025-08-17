"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function Navigation() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { name: "Home", href: "/home" },
    { name: "Chats", href: "/chats" },
    { name: "Profile", href: "/profile" },
  ];

  // Don't show navigation on auth pages or landing page (root)
  if (pathname.startsWith("/auth") || pathname === "/") {
    return null;
  }

  return (
    <nav className="border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  pathname === item.href
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-700">
                  Welcome, {user?.full_name || user?.username}
                </span>
                <button
                  onClick={logout}
                  className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
