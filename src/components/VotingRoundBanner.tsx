import { ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VotingRoundBannerProps {
  timeLeft: string;
  onRemindMe?: () => void;
  onStakeClick?: () => void;
}

export const VotingRoundBanner = ({ timeLeft, onRemindMe, onStakeClick }: VotingRoundBannerProps) => {
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
      
      <div className="flex items-center gap-4">
        {onStakeClick && (
          <Button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onStakeClick();
            }}
            variant="outline"
            className="border-amber text-amber hover:bg-amber/10"
          >
            Stake / Unstake
          </Button>
        )}
        <button 
          onClick={onRemindMe}
          className="text-amber hover:text-amber/80 font-medium transition-colors"
        >
          Remind me
        </button>
      </div>
    </div>
  );
};
