import { Button } from "@/components/ui/button";
import eclipseLogo from "@/assets/eclipse-logo.jpg";

export const Navigation = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background border-b border-border">
      <div className="flex items-center gap-3">
        <img src={eclipseLogo} alt="Eclipse" className="w-8 h-8 rounded-full" />
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-amber">ECLIPSE</span>
          <span className="text-sm text-muted-foreground font-medium">VOTING</span>
        </div>
      </div>
      
      <nav className="hidden md:flex items-center gap-6">
        <a href="#upcoming" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Upcoming Votes
        </a>
        <a href="#past" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Past Votes
        </a>
        <a href="#oracle" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Optimistic Oracle
        </a>
      </nav>
      
      <div className="flex items-center gap-4">
        <Button className="bg-amber hover:bg-amber/90 text-primary-foreground font-medium px-6 rounded-full">
          Connect wallet
        </Button>
      </div>
    </header>
  );
};
