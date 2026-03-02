import Image from "next/image";
import { Badge } from "./badge";

interface CauseCardProps {
  name: string;
  description: string;
  category: string;
  raised: number;
  goal: number;
  image?: string;
}

export function CauseCard({
  name,
  description,
  category,
  raised,
  goal,
  image,
}: CauseCardProps) {
  const percentage = Math.min((raised / goal) * 100, 100);

  return (
    <div className="bg-mist rounded-[var(--radius-md)] border border-sage/40 shadow-[var(--shadow-sm)] overflow-hidden hover:shadow-[var(--shadow-md)] transition-shadow duration-300">
      {/* Image */}
      <div className="h-40 relative overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full bg-sprout/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-meadow/40 text-5xl">
              volunteer_activism
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <Badge variant="category">{category}</Badge>

        <h3 className="text-deep font-bold text-lg mt-2">{name}</h3>
        <p className="text-stone text-sm mt-1 line-clamp-2">{description}</p>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full h-2.5 bg-sage/30 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${percentage}%`,
                background: "linear-gradient(to right, #A7C4A0, #7BA074)",
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-meadow font-bold text-sm">
              ${raised.toLocaleString()}
            </span>
            <span className="text-stone text-sm">
              de ${goal.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
