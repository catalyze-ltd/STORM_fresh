import type { JSX } from "preact";
import { forwardRef } from "preact/compat";
import { useSignal } from "@preact/signals";

import { cn } from "../utils.ts";

export type InputProps = JSX.HTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ class: className, type, value, ...props }, ref) => {
    const unchanged = useSignal(true);

    return (
      <input
        type={type}
        class={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        value={value}
        data-unchanged={unchanged}
        onBlur={(e) => unchanged.value = e.currentTarget.value === value}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
export default Input;
