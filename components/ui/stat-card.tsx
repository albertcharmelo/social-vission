interface StatCardProps {
  value: string;
  label: string;
  accent?: boolean;
}

export function StatCard({ value, label, accent = false }: StatCardProps) {
  return (
    <div className="text-center">
      <p
        className={`text-3xl font-bold ${accent ? "text-meadow" : "text-deep"}`}
      >
        {value}
      </p>
      <p className="text-stone text-sm mt-1">{label}</p>
    </div>
  );
}
