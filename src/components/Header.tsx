import { Send } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="industrial-stripe" />
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-wider leading-none">
              PROJECTS BY TIMOFEYL
            </h1>
            <span className="mono text-xs text-muted-foreground tracking-widest">
              PROTON BUS SIMULATOR — МОДИФИКАЦИИ
            </span>
          </div>
        </Link>
        <a
          href="https://t.me/pbtl_pbs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-primary px-4 py-2 text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-display text-sm tracking-wider"
        >
          <Send className="h-4 w-4" />
          TELEGRAM
        </a>
      </div>
      <div className="industrial-stripe" />
    </header>
  );
};

export default Header;
