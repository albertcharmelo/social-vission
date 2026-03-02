interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({ children, className = "", padding = true }: CardProps) {
  return (
    <div
      className={`
        bg-mist rounded-[var(--radius-md)] border border-sage/40
        shadow-[var(--shadow-sm)]
        ${padding ? "p-6" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
