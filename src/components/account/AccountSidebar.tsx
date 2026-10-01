"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  MapPin,
  User,
  Heart,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AccountSidebar() {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/my-account", icon: LayoutDashboard },
    { label: "Orders", href: "/my-account/orders", icon: ShoppingBag },
    { label: "Addresses", href: "/my-account/addresses", icon: MapPin },
    { label: "Account Details", href: "/my-account/account-details", icon: User },
    { label: "Wishlist", href: "/wishlist", icon: Heart },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs space-y-1">
      <div className="px-3 py-3 border-b border-gray-100 mb-2">
        <p className="text-xs text-gray-400 font-medium">Signed in as</p>
        <p className="text-sm font-bold text-gray-900">Alex Morgan</p>
        <p className="text-xs text-gray-500 truncate">alex.morgan@example.com</p>
      </div>

      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors",
              isActive
                ? "bg-red-50 text-red-600 font-bold"
                : "text-gray-700 hover:bg-gray-50 hover:text-red-600"
            )}
          >
            <Icon className={cn("h-4 w-4", isActive ? "text-red-600" : "text-gray-400")} />
            <span>{link.label}</span>
          </Link>
        );
      })}

      <div className="pt-2 border-t border-gray-100 mt-2">
        <button
          onClick={() => alert("Logged out successfully")}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut className="h-4 w-4 text-rose-500" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
