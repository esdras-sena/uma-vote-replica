import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const navItems = [
  { label: "Verify", href: "#", active: true },
  { label: "Propose", href: "#" },
  { label: "Settled", href: "#" },
  { label: "Docs", href: "#", external: true },
];

export const Navigation = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber to-primary flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-background" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-semibold tracking-tight">ECLIPSE</span>
          <span className="text-sm text-muted-foreground">ORACLE</span>
        </div>
      </div>
      
      <nav className="flex items-center gap-8">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center gap-1 text-sm transition-colors ${
              item.active 
                ? "text-foreground font-medium" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
            {item.external && <ExternalLink className="w-3 h-3" />}
          </a>
        ))}
      </nav>
      
      <Button className="bg-coral hover:bg-coral/90 text-foreground font-medium px-6">
        Connect wallet
      </Button>
    </header>
  );
};
