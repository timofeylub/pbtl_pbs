import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Mod } from "@/types/mod";

interface SearchFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  typeFilter: string;
  onTypeChange: (v: string) => void;
  cityFilter: string;
  onCityChange: (v: string) => void;
  modelFilter: string;
  onModelChange: (v: string) => void;
  mods: Mod[];
}

const SearchFilters = ({
  search, onSearchChange,
  typeFilter, onTypeChange,
  cityFilter, onCityChange,
  modelFilter, onModelChange,
  mods,
}: SearchFiltersProps) => {
  const cities = [...new Set(mods.map(m => m.city).filter(Boolean))] as string[];
  const models = [...new Set(mods.map(m => m.compatibleModel).filter(Boolean))] as string[];

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="ПОИСК МОДИФИКАЦИЙ..."
          className="pl-10 bg-input border-border font-display tracking-wider placeholder:text-muted-foreground rounded-none"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Select value={typeFilter} onValueChange={onTypeChange}>
          <SelectTrigger className="w-[140px] rounded-none bg-input border-border font-display text-xs tracking-wider">
            <SelectValue placeholder="ТИП" />
          </SelectTrigger>
          <SelectContent className="rounded-none bg-card border-border">
            <SelectItem value="all" className="font-display text-xs">ВСЕ ТИПЫ</SelectItem>
            <SelectItem value="skin" className="font-display text-xs">ОКРАС</SelectItem>
            <SelectItem value="vehicle" className="font-display text-xs">ТС</SelectItem>
            <SelectItem value="map" className="font-display text-xs">КАРТА</SelectItem>
          </SelectContent>
        </Select>

        {cities.length > 0 && (
          <Select value={cityFilter} onValueChange={onCityChange}>
            <SelectTrigger className="w-[160px] rounded-none bg-input border-border font-display text-xs tracking-wider">
              <SelectValue placeholder="ГОРОД" />
            </SelectTrigger>
            <SelectContent className="rounded-none bg-card border-border">
              <SelectItem value="all" className="font-display text-xs">ВСЕ ГОРОДА</SelectItem>
              {cities.map(c => (
                <SelectItem key={c} value={c} className="font-display text-xs">{c.toUpperCase()}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {models.length > 0 && (
          <Select value={modelFilter} onValueChange={onModelChange}>
            <SelectTrigger className="w-[200px] rounded-none bg-input border-border font-display text-xs tracking-wider">
              <SelectValue placeholder="МОДЕЛЬ ТС" />
            </SelectTrigger>
            <SelectContent className="rounded-none bg-card border-border">
              <SelectItem value="all" className="font-display text-xs">ВСЕ МОДЕЛИ</SelectItem>
              {models.map(m => (
                <SelectItem key={m} value={m} className="font-display text-xs">{m.toUpperCase()}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
