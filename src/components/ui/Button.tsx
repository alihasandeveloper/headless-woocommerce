import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-600/20 active:bg-red-800",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300",
        outline: "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100",
        outlineRed: "border border-red-600 text-red-600 bg-transparent hover:bg-red-50 active:bg-red-100",
        ghost: "hover:bg-gray-100 text-gray-700 hover:text-gray-900",
        link: "text-red-600 underline-offset-4 hover:underline p-0 h-auto font-normal",
        dark: "bg-gray-900 text-white hover:bg-black active:bg-gray-800",
      },
      size: {
        sm: "h-9 px-3 text-xs rounded-md",
        md: "h-11 px-5 py-2.5 text-sm rounded-lg",
        lg: "h-13 px-8 text-base font-semibold rounded-lg",
        icon: "h-10 w-10 rounded-full",
        iconSm: "h-8 w-8 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin text-current" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
