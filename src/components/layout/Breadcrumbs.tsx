import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Container } from "./Container";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  container?: boolean;
}

export function Breadcrumbs({ items, container = true }: BreadcrumbsProps) {
  const content = (
    <nav className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 py-3 overflow-x-auto whitespace-nowrap">
      <Link
        href="/"
        className="flex items-center hover:text-red-600 transition-colors"
      >
        <Home className="h-3.5 w-3.5 mr-1" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            <ChevronRight className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            {isLast || !item.href ? (
              <span className="font-medium text-gray-900 truncate max-w-[200px] sm:max-w-xs">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-red-600 transition-colors truncate max-w-[150px] sm:max-w-xs"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );

  if (container) {
    return (
      <div className="border-b border-gray-100 bg-gray-50/70">
        <Container>{content}</Container>
      </div>
    );
  }

  return content;
}
