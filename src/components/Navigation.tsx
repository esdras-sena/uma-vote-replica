import { Link } from "react-router-dom";
import eclipseLogo from "@/assets/eclipse-logo.jpg";
import { Button } from "./ui/button";
import { ConnectButton } from "./ConnectButton";

interface NavigationProps {
  activeTab?: "votes" | "upcoming" | "past" | "oracle";
}

export const Navigation = ({ activeTab = "votes" }: NavigationProps) => {
  const getLinkClasses = (tab: string) => {
    const isActive = activeTab === tab;
    return isActive
      ? "text-sm text-foreground font-medium border-b-2 border-amber pb-1 transition-colors"
      : "text-sm text-muted-foreground hover:text-foreground transition-colors";
  };

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
        <Link to="/" className={getLinkClasses("votes")}>
          Votes
        </Link>
        <Link to="/upcoming-votes" className={getLinkClasses("upcoming")}>
          Upcoming Votes
        </Link>
        <Link to="/past-votes" className={getLinkClasses("past")}>
          Past Votes
        </Link>
        <a 
          href="https://eclipse-oracle.lovable.app/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={getLinkClasses("oracle")}
        >
          Optimistic Oracle
        </a>
      </nav>
      
      <ConnectButton/>
    </header>
  );
};
