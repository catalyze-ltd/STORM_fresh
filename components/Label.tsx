import { type ComponentPropsWithRef, forwardRef } from "preact/compat";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils.ts";

const labelVariants = cva(
  "text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = forwardRef<
  HTMLLabelElement,
  & ComponentPropsWithRef<typeof LabelPrimitive.Root>
  & VariantProps<typeof labelVariants>
>(({ class: className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export default Label;
