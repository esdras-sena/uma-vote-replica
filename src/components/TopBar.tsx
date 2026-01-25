import { Clock, ExternalLink } from "lucide-react";

interface TopBarProps {
  timeLeft: string;
  voteCount: number;
}

export const TopBar = ({ timeLeft, voteCount }: TopBarProps) => {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Time to reveal vote:</span>
          <span className="font-mono text-foreground font-medium">{timeLeft}</span>
        </div>
        <div className="px-3 py-1 rounded-full bg-secondary text-sm font-medium">
          {voteCount} votes
        </div>
      </div>
      <a 
        href="#" 
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        More details
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
};
