import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "emerald" | "amber" | "rose" | "blue" | "zinc" | "cyan" | "purple";
  size?: "sm" | "md";
  className?: string;
}

const variantStyles: Record<string, string> = {
  emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  amber: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  rose: "bg-rose-500/10 text-rose-300 border-rose-500/30",
  blue: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  purple: "bg-purple-500/10 text-purple-300 border-purple-500/30",
  zinc: "bg-white/[0.05] text-zinc-300 border-white/10",
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "zinc",
  size = "sm",
  className = "",
}) => {
  const sizeStyle = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";
  const style = variantStyles[variant] || variantStyles.zinc;

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono-code font-semibold rounded-md border ${style} ${sizeStyle} ${className}`}
    >
      {children}
    </span>
  );
};
