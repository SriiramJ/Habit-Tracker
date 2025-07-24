import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    variant?: "default" | "secondary" | "outline" | "ghost"
    size?: "sm" | "md" | "lg" | "icon"
}

export const Button = React.forwardRef<HTMLButtonElement,ButtonProps>(
    (
        {className, variant = "default", size = "md", ...props},
        ref
    ) =>{
        const base =
      "inline-flex items-center justify-center font-medium rounded transition focus:outline-none focus:ring-2 focus:ring-blue-500";
    const variants: Record<string, string> = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      outline: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    };
    const sizes: Record<string, string> = {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
      icon: "p-2 w-9 h-9",
    };

    return (
      <button
        ref={ref}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
)