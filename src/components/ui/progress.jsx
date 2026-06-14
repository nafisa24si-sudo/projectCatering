import React, { createContext, useContext } from "react";

import { cn } from "@/lib/utils";

const ProgressContext = createContext({ value: 0 });

function Progress({
  className,
  children,
  value = 0,
  ...props
}) {
  return (
    <ProgressContext.Provider value={{ value }}>
      <div className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    </ProgressContext.Provider>
  );
}

function ProgressTrack({
  className,
  children,
  ...props
}) {
  return (
    <div
      className={cn("relative h-3 w-full overflow-hidden rounded-full bg-slate-200", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function ProgressIndicator({
  className,
  ...props
}) {
  const { value } = useContext(ProgressContext);
  return (
    <div
      className={cn("h-full rounded-full bg-emerald-500 transition-all duration-300", className)}
      style={{ width: `${value}%` }}
      {...props}
    />
  );
}

function ProgressLabel({
  className,
  ...props
}) {
  return (
    <div className={cn("text-sm font-medium text-slate-900", className)} {...props} />
  );
}

function ProgressValue({
  className,
  ...props
}) {
  const { value } = useContext(ProgressContext);
  return (
    <div className={cn("ml-auto text-sm text-slate-500 tabular-nums", className)} {...props}>
      {value}%
    </div>
  );
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
};
