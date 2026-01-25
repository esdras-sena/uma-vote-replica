import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export const Navigation = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold tracking-tight text-coral">UMA</span>
        <span className="text-sm text-muted-foreground font-medium">VOTING</span>
      </div>
      
      <div className="flex items-center gap-4">
        <Button className="bg-coral hover:bg-coral/90 text-white font-medium px-6 rounded-full">
          Connect wallet
        </Button>
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <Menu className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </header>
  );
};
