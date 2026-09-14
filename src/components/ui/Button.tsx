import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "bilibili";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "secondary",
  size = "md",
  icon,
  className = "",
  disabled,
  ...props
}) => {
  const base =
    "font-mono-code font-semibold rounded-xl inline-flex items-center justify-center gap-1.5 transition-all select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3.5 py-2 text-xs",
    lg: "px-4.5 py-2.5 text-sm",
  };

  const variantStyles = {
    primary: "bg-white text-black hover:bg-zinc-200 shadow-md shadow-white/10 active:scale-[0.98]",
    secondary: "bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/[0.08] border border-white/10 active:scale-[0.98]",
    outline: "bg-transparent text-zinc-300 hover:text-white border border-white/20 hover:border-white/40",
    ghost: "bg-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/5",
    bilibili: "bg-[#00aeec] text-black hover:bg-[#00aeec]/90 shadow-md shadow-[#00aeec]/20 active:scale-[0.98]",
  };

  return (
    <button
      className={`${base} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
