import type { JSX } from "preact";
import { type ForwardedRef, forwardRef } from "preact/compat";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "../utils.ts";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:saturate-150",
        destructive:
          "bg-destructive text-destructive-foreground hover:saturate-150",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:saturate-150",
        ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground",
        ghostDestructive:
          "bg-transparent text-destructive hover:bg-destructive hover:text-destructive-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-6 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        smIcon: "h-4 w-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps extends
  // size type clashes with variant prop
  Omit<JSX.HTMLAttributes<HTMLButtonElement>, "size" | "ref">,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      class: className,
      variant,
      size,
      asChild = false,
      type: btnType,
      ...props
    },
    ref,
  ) => {
    if (asChild) {
      return (
        <Slot
          class={cn(buttonVariants({ variant, size, className }))}
          ref={ref as ForwardedRef<HTMLElement>}
          {...props}
        />
      );
    } else {
      return (
        <button
          class={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          type={btnType ?? "button"} // Default button type to avoid unexpected submit
          {...props}
        />
      );
    }
  },
);
Button.displayName = "Button";

export default Button;