import { Clock, Eye } from "lucide-react";

interface VoteTimerProps {
  commitTimeLeft: string;
  revealTimeLeft: string;
}

export const VoteTimer = ({ commitTimeLeft, revealTimeLeft }: VoteTimerProps) => {
  return (
    <div className="flex rounded-lg overflow-hidden border border-border">
      <div className="flex items-center gap-3 px-5 py-3 bg-coral text-white flex-1">
        <Clock className="w-5 h-5" />
        <span className="text-sm">
          Time remaining to commit votes: <span className="font-semibold">{commitTimeLeft}</span>
        </span>
      </div>
      <div className="flex items-center gap-3 px-5 py-3 bg-card flex-1 justify-between">
        <div className="flex items-center gap-3">
          <Eye className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Reveal phase starts in: <span className="font-semibold text-foreground">{revealTimeLeft}</span>
          </span>
        </div>
        <a href="#" className="text-coral font-medium hover:underline text-sm">
          Remind me
        </a>
      </div>
    </div>
  );
};
