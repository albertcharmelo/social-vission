type BadgeVariant =
  | "impact"
  | "pro"
  | "category"
  | "completed"
  | "pending"
  | "cancelled";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  impact: "bg-sprout/20 text-dusk",
  pro: "bg-honey/25 text-terra",
  category: "bg-calm/25 text-dusk",
  completed: "bg-sprout/20 text-meadow",
  pending: "bg-honey/25 text-dusk",
  cancelled: "bg-blush/20 text-dusk",
};

export function Badge({
  variant = "category",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center text-xs font-semibold
        px-2.5 py-1 rounded-[var(--radius-full)]
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
