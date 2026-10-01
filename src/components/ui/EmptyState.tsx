import React from "react";
import { LucideIcon, PackageOpen } from "lucide-react";
import { Button } from "./Button";
import Link from "next/link";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
}

export function EmptyState({
  icon: Icon = PackageOpen,
  title,
  description,
  actionText,
  actionHref,
  onActionClick,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 p-8 text-center sm:p-12">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600 shadow-sm">
        <Icon className="h-8 w-8 stroke-[1.5]" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-gray-500 leading-relaxed">
          {description}
        </p>
      )}
      {actionText && (
        <div className="mt-6">
          {actionHref ? (
            <Link href={actionHref}>
              <Button variant="primary">{actionText}</Button>
            </Link>
          ) : (
            <Button variant="primary" onClick={onActionClick}>
              {actionText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
