import Image from "next/image";
import { Badge } from "./badge";
import { Button } from "./button";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  provider: string;
  rating: number;
  reviews: number;
  isPro?: boolean;
  image?: string;
  href?: string;
}

export function ServiceCard({
  title,
  description,
  price,
  provider,
  rating,
  reviews,
  isPro = false,
  image,
  href = "#",
}: ServiceCardProps) {
  return (
    <div className="bg-mist rounded-[var(--radius-md)] border border-sage/40 shadow-[var(--shadow-sm)] overflow-hidden group hover:shadow-[var(--shadow-md)] transition-shadow duration-300">
      {/* Image */}
      <div className="h-44 relative overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full bg-sage/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-stone/40 text-5xl">
              image
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Badges */}
        <div className="flex gap-2 mb-3">
          <Badge variant="impact">
            <span className="material-symbols-outlined text-xs mr-1" style={{ fontSize: "14px" }}>
              favorite
            </span>
            10% impacto
          </Badge>
          {isPro && <Badge variant="pro">PRO</Badge>}
        </div>

        {/* Title */}
        <h3 className="text-deep font-bold text-lg leading-tight">{title}</h3>
        <p className="text-stone text-sm mt-1.5 line-clamp-2">{description}</p>

        {/* Provider */}
        <div className="flex items-center gap-2 mt-3">
          <div className="w-6 h-6 rounded-full bg-sage/50 flex items-center justify-center">
            <span className="material-symbols-outlined text-stone" style={{ fontSize: "14px" }}>
              person
            </span>
          </div>
          <span className="text-stone text-xs">{provider}</span>
          <span className="text-xs text-honey ml-auto">
            {"★".repeat(Math.floor(rating))} {rating}
          </span>
          <span className="text-xs text-stone">({reviews})</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-sage/30">
          <span className="text-deep font-bold text-xl">{price}</span>
          <a href={href}>
            <Button>Contratar</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
