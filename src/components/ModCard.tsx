import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import type { Mod } from "@/types/mod";

const typeLabels: Record<string, string> = {
  skin: "ОКРАС",
  vehicle: "ТС",
  map: "КАРТА",
};

const typeStyles: Record<string, string> = {
  skin: "bg-primary text-primary-foreground",
  vehicle: "bg-secondary text-secondary-foreground",
  map: "bg-muted text-foreground",
};

const ModCard = ({ mod }: { mod: Mod }) => {
  return (
    <Link to={`/mod/${mod.id}`} className="group block">
      <div className="industrial-border bg-card overflow-hidden transition-all hover:border-primary">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={mod.cover}
            alt={mod.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <Badge className={`absolute top-2 left-2 rounded-none font-display tracking-wider text-[10px] ${typeStyles[mod.type]}`}>
            {typeLabels[mod.type]}
          </Badge>
        </div>
        <div className="p-3">
          <h3 className="font-display text-lg text-foreground truncate group-hover:text-primary transition-colors">
            {mod.name}
          </h3>
          <p className="mono text-xs text-muted-foreground mt-1">{mod.author}</p>
          {mod.city && (
            <p className="mono text-xs text-muted-foreground mt-0.5">📍 {mod.city}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ModCard;
