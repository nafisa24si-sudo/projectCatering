import React from "react";

import { cn } from "@/lib/utils";

const sizes = {
  sm: "h-10 w-10 text-xs",
  default: "h-12 w-12 text-sm",
  lg: "h-14 w-14 text-base",
};

function Avatar({
  className,
  size = "default",
  children,
  ...props
}) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-slate-100 text-slate-700",
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function AvatarImage({
  className,
  ...props
}) {
  return (
    <img
      className={cn("h-full w-full rounded-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-slate-200 text-sm text-slate-700",
        className
      )}
      {...props}
    />
  );
}

function AvatarBadge({
  className,
  ...props
}) {
  return (
    <span
      className={cn(
        "absolute -right-1 -bottom-1 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-emerald-600 px-2 text-xs font-semibold text-white",
        className
      )}
      {...props}
    />
  );
}

function AvatarGroup({
  className,
  children,
  ...props
}) {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      {children}
    </div>
  );
}

function AvatarGroupCount({
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "flex h-10 min-w-10 items-center justify-center rounded-full bg-slate-200 px-3 text-sm font-semibold text-slate-700",
        className
      )}
      {...props}
    />
  );
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
};
