import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import modsData from "@/data/mods.json";
import type { Mod } from "@/types/mod";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import ImageLightbox from "@/components/ImageLightbox";

const mods = modsData as Mod[];

const typeLabels: Record<string, string> = {
  skin: "ОКРАС",
  vehicle: "ТРАНСПОРТНОЕ СРЕДСТВО",
  map: "КАРТА",
};

const typeStyles: Record<string, string> = {
  skin: "bg-primary text-primary-foreground",
  vehicle: "bg-secondary text-secondary-foreground",
  map: "bg-muted text-foreground",
};

const ModPage = () => {
  const { id } = useParams();
  const mod = mods.find(m => m.id === id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!mod) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <p className="font-display text-2xl text-muted-foreground">МОД НЕ НАЙДЕН</p>
          <Link to="/" className="inline-flex items-center gap-2 mt-4 text-primary hover:underline font-display tracking-wider">
            <ArrowLeft className="h-4 w-4" /> ВЕРНУТЬСЯ
          </Link>
        </div>
      </div>
    );
  }

  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-background texture-concrete">
      <Header />
      <main className="container py-8 space-y-6">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-display text-sm tracking-wider">
          <ArrowLeft className="h-4 w-4" /> НАЗАД К КАТАЛОГУ
        </Link>

        <div className="industrial-stripe" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gallery */}
          <div className="lg:col-span-2 space-y-3">
            <div
              className="industrial-border overflow-hidden cursor-pointer aspect-video bg-muted"
              onClick={() => openLightbox(0)}
            >
              <img src={mod.cover} alt={mod.name} className="w-full h-full object-cover" />
            </div>
            {mod.screenshots.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {mod.screenshots.map((s, i) => (
                  <div
                    key={i}
                    className="industrial-border overflow-hidden cursor-pointer aspect-video bg-muted hover:border-primary transition-colors"
                    onClick={() => openLightbox(i + 1)}
                  >
                    <img src={s} alt={`Скриншот ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div>
              <Badge className={`rounded-none font-display tracking-wider text-xs mb-2 ${typeStyles[mod.type]}`}>
                {typeLabels[mod.type]}
              </Badge>
              <h2 className="font-display text-3xl text-foreground leading-tight">{mod.name}</h2>
              <p className="mono text-sm text-muted-foreground mt-1">Автор: {mod.author}</p>
            </div>

            {mod.compatibleModel && (
              <div className="border border-border p-3">
                <p className="mono text-xs text-muted-foreground mb-1">СОВМЕСТИМАЯ МОДЕЛЬ</p>
                <p className="font-display text-sm text-foreground">{mod.compatibleModel}</p>
              </div>
            )}

            {mod.city && (
              <div className="border border-border p-3">
                <p className="mono text-xs text-muted-foreground mb-1">ГОРОД</p>
                <p className="font-display text-sm text-foreground">{mod.city}</p>
              </div>
            )}

            <div>
              <p className="mono text-xs text-muted-foreground mb-1">ОПИСАНИЕ</p>
              <p className="text-sm text-foreground leading-relaxed">{mod.description}</p>
            </div>

            <div className="industrial-stripe" />

            <div className="space-y-2">
              <p className="mono text-xs text-muted-foreground mb-2">СКАЧАТЬ</p>
              {mod.downloads.modsfire && (
                <a
                  href={mod.downloads.modsfire}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full border-2 border-primary bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-display tracking-wider py-3 text-sm"
                >
                  <Download className="h-4 w-4" />
                  MODSFIRE
                </a>
              )}
              {mod.downloads.sharemods && (
                <a
                  href={mod.downloads.sharemods}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full border-2 border-secondary bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground transition-colors font-display tracking-wider py-3 text-sm"
                >
                  <Download className="h-4 w-4" />
                  SHAREMODS
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="industrial-stripe" />

        <footer className="text-center py-4">
          <p className="mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} PROJECTS BY TIMOFEYL | PROTON BUS SIMULATOR
          </p>
        </footer>
      </main>

      <ImageLightbox
        images={[mod.cover, ...mod.screenshots]}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </div>
  );
};

export default ModPage;
