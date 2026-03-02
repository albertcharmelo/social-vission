interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export function DashboardCard({
  children,
  className = "",
  padding = true,
}: DashboardCardProps) {
  return (
    <div
      className={`
        bg-white rounded-2xl border border-sage/20
        shadow-[var(--shadow-sm)]
        ${padding ? "p-6" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
