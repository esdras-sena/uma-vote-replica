import { ClipboardCheck } from "lucide-react";

interface VotingRoundBannerProps {
  timeLeft: string;
  onRemindMe?: () => void;
}

export const VotingRoundBanner = ({ timeLeft, onRemindMe }: VotingRoundBannerProps) => {
  return (
    <div className="bg-secondary/50 rounded-lg px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
          <ClipboardCheck className="w-5 h-5 text-foreground" />
        </div>
        <p className="text-foreground">
          Next voting round starts in: <span className="font-bold">{timeLeft}</span>
        </p>
      </div>
      
      <button 
        onClick={onRemindMe}
        className="text-coral hover:text-coral/80 font-medium transition-colors"
      >
        Remind me
      </button>
    </div>
  );
};
