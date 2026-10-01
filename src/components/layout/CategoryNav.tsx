"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { ProductCategory } from "@/types/category";
import { ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

interface CategoryNavProps {
  categories: ProductCategory[];
}

export function CategoryNav({ categories }: CategoryNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hidden border-b border-gray-100 bg-gray-50/60 md:block">
      <Container>
        <div className="flex items-center justify-between h-10">
          {/* Category Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              onBlur={() => setTimeout(() => setIsOpen(false), 250)}
              className="flex items-center gap-2 text-xs font-bold text-gray-800 hover:text-red-600 transition-colors py-2"
            >
              <Menu className="h-4 w-4" />
              <span>ক্যাটাগরি সমুহ</span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200 text-gray-500",
                  isOpen && "rotate-180 text-red-600"
                )}
              />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute left-0 top-full z-50 w-56 rounded-lg border border-gray-200 bg-white py-1 shadow-lg animate-in fade-in slide-in-from-top-1 duration-150">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/product-category/${category.slug}`}
                    className="flex items-center justify-between px-4 py-2 text-xs font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <span>{category.name}</span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      ({category.count})
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Navigation Links */}
          <nav className="flex items-center space-x-6 text-xs font-bold text-gray-700">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "hover:text-red-600 transition-colors py-1",
                    isActive && "text-red-600 font-extrabold"
                  )}
                >
                  {link.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </Container>
    </div>
  );
}
