import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  initialIndex?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ImageLightbox = ({ images, initialIndex = 0, open, onOpenChange }: ImageLightboxProps) => {
  const [index, setIndex] = useState(initialIndex);

  const prev = () => setIndex(i => (i - 1 + images.length) % images.length);
  const next = () => setIndex(i => (i + 1) % images.length);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full bg-background/95 border-border rounded-none p-0">
        <div className="relative flex items-center justify-center min-h-[60vh]">
          <img
            src={images[index]}
            alt={`Скриншот ${index + 1}`}
            className="max-h-[80vh] w-full object-contain"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 border border-border hover:border-primary transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-background/80 border border-border hover:border-primary transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 mono text-xs text-muted-foreground">
            {index + 1} / {images.length}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLightbox;
