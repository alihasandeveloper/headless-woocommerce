import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-red-600 text-white",
        secondary: "bg-gray-100 text-gray-800",
        outline: "border border-gray-300 text-gray-700 bg-white",
        sale: "bg-red-600 text-white shadow-sm shadow-red-600/30",
        success: "bg-emerald-500 text-white",
        warning: "bg-amber-500 text-white",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
