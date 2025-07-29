import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-secondary-400 text-white shadow-md hover:bg-secondary-500 active:bg-secondary-600",
        destructive:
          "bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 active:bg-destructive/80",
        outline:
          "border-2 border-accent-400 bg-background text-accent-600 shadow-md hover:bg-accent-400 hover:text-white active:bg-accent-500",
        secondary:
          "bg-accent-400 text-white shadow-md hover:bg-accent-500 active:bg-accent-600",
        ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
        link: "text-secondary-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-14 px-8 py-4",
        sm: "h-11 rounded-md px-6 py-3 text-sm",
        lg: "h-16 rounded-md px-10 py-5 text-base",
        icon: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
