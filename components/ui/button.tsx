import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-warmth hover:bg-terra text-white shadow-[var(--shadow-cta)]",
  secondary:
    "bg-transparent text-dusk hover:bg-mist border border-sage",
  ghost: "bg-transparent text-sky hover:bg-calm/20",
  destructive: "bg-blush text-deep hover:brightness-90",
};

export function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-1.5
        font-semibold text-sm px-5 py-2.5 rounded-[var(--radius-full)]
        transition-colors cursor-pointer
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
