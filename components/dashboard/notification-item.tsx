import { Handshake, Star, CreditCard, Settings, Briefcase } from "lucide-react";
import type { NotificationType } from "@/lib/mock/dashboard-data";

interface NotificationItemProps {
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

const typeIcons: Record<NotificationType, typeof Handshake> = {
  deal: Handshake,
  review: Star,
  payment: CreditCard,
  system: Settings,
  opportunity: Briefcase,
};

const typeBg: Record<NotificationType, string> = {
  deal: "bg-calm/20 text-sky",
  review: "bg-honey/20 text-terra",
  payment: "bg-sprout/20 text-meadow",
  system: "bg-sage/20 text-dusk",
  opportunity: "bg-petal/20 text-terra",
};

export function NotificationItem({
  type,
  title,
  description,
  timestamp,
  read,
}: NotificationItemProps) {
  const Icon = typeIcons[type];

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl transition-colors ${!read ? "bg-warmth/5" : "hover:bg-sage/5"}`}>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${typeBg[type]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={`text-sm ${!read ? "text-deep font-semibold" : "text-dusk font-medium"}`}>
            {title}
          </p>
          {!read && <span className="w-2 h-2 rounded-full bg-warmth flex-shrink-0" />}
        </div>
        <p className="text-stone text-xs mt-0.5 truncate">{description}</p>
      </div>
      <span className="text-stone text-xs flex-shrink-0">{timestamp}</span>
    </div>
  );
}
