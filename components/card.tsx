import type { JSX } from "preact";
import { forwardRef } from "preact/compat";

import { cn } from "../utils.ts";

const Card = forwardRef<
  HTMLDivElement,
  JSX.HTMLAttributes<HTMLDivElement>
>(({ class: className, ...props }, ref) => (
  <div
    ref={ref}
    class={cn(
      "rounded-xl border border-border bg-card text-card-foreground shadow",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardContent = forwardRef<
  HTMLDivElement,
  JSX.HTMLAttributes<HTMLDivElement>
>(({ class: className, ...props }, ref) => (
  <div ref={ref} class={cn("p-1", className)} {...props} />
));
CardContent.displayName = "CardContent";

export {Card, CardContent};