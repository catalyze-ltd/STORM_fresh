import {
  type ComponentPropsWithRef,
  forwardRef,
  type RefAttributes,
} from "preact/compat";

import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "../utils.ts";
  
  const Tabs = TabsPrimitive.Root;
  
  const TabsList = forwardRef<
    HTMLDivElement,
    ComponentPropsWithRef<typeof TabsPrimitive.List>
  >(({ class: className, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      class={cn(
        "flex h-9 items-center rounded-lg bg-muted p-1 text-muted-foreground",
        className,
      )}
      {...props}
    />
  ));
  TabsList.displayName = "TabsList";
  
  const TabsTrigger = forwardRef<
    HTMLButtonElement,
    TabsPrimitive.TabsTriggerProps & RefAttributes<HTMLButtonElement>
  >(({ class: className, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      class={cn(
        "flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
        className,
      )}
      {...props}
    />
  ));
  TabsTrigger.displayName = "TabsTrigger";
  
  const TabsContent = forwardRef<
    HTMLDivElement,
    TabsPrimitive.TabsContentProps & RefAttributes<HTMLDivElement>
  >(({ class: className, ...props }, ref) => (
    <TabsPrimitive.Content
      ref={ref}
      class={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    />
  ));
  TabsContent.displayName = "TabsContent";
  
  export { Tabs, TabsContent, TabsList, TabsTrigger };
  