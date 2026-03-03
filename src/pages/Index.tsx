import { useState, useMemo } from "react";
import modsData from "@/data/mods.json";
import type { Mod } from "@/types/mod";
import Header from "@/components/Header";
import ModCard from "@/components/ModCard";
import SearchFilters from "@/components/SearchFilters";

const mods = modsData as Mod[];

const Index = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [modelFilter, setModelFilter] = useState("all");

  const filtered = useMemo(() => {
    return mods.filter(m => {
      if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (typeFilter !== "all" && m.type !== typeFilter) return false;
      if (cityFilter !== "all" && m.city !== cityFilter) return false;
      if (modelFilter !== "all" && m.compatibleModel !== modelFilter) return false;
      return true;
    });
  }, [search, typeFilter, cityFilter, modelFilter]);

  return (
    <div className="min-h-screen bg-background texture-concrete">
      <Header />
      <main className="container py-8 space-y-6">
        <SearchFilters
          search={search} onSearchChange={setSearch}
          typeFilter={typeFilter} onTypeChange={setTypeFilter}
          cityFilter={cityFilter} onCityChange={setCityFilter}
          modelFilter={modelFilter} onModelChange={setModelFilter}
          mods={mods}
        />

        <div className="industrial-stripe" />

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-display text-xl text-muted-foreground tracking-wider">МОДИФИКАЦИИ НЕ НАЙДЕНЫ</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(mod => (
              <ModCard key={mod.id} mod={mod} />
            ))}
          </div>
        )}

        <div className="industrial-stripe" />

        <footer className="text-center py-4">
          <p className="mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} PROJECTS BY TIMOFEYL | PROTON BUS SIMULATOR
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
