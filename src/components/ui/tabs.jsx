import React, { createContext, useContext, useState } from "react";

import { cn } from "@/lib/utils";

const TabsContext = createContext({
  value: undefined,
  onChange: () => {},
});

function Tabs({
  className,
  defaultValue,
  children,
  ...props
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, onChange: setValue }}>
      <div className={cn("flex flex-col gap-0", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function TabsList({
  className,
  variant = "default",
  children,
  ...props
}) {
  const base = variant === "line"
    ? "inline-flex gap-2 border-b border-slate-200"
    : "inline-flex rounded-2xl bg-slate-100 p-1";

  return (
    <div className={cn(base, className)} {...props}>
      {children}
    </div>
  );
}

function TabsTrigger({
  className,
  value,
  children,
  ...props
}) {
  const { value: activeValue, onChange } = useContext(TabsContext);
  const active = activeValue === value;

  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={cn(
        "rounded-2xl px-4 py-2 text-sm font-medium transition",
        active
          ? "bg-white text-slate-900 shadow-sm"
          : "text-slate-500 hover:text-slate-900",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function TabsContent({
  className,
  value,
  children,
  ...props
}) {
  const { value: activeValue } = useContext(TabsContext);
  return activeValue === value ? (
    <div className={cn("text-sm", className)} {...props}>
      {children}
    </div>
  ) : null;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
