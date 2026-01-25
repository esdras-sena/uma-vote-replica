import { Info, X } from "lucide-react";
import { useState } from "react";

export const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-card border-b border-border">
      <div className="flex items-center gap-3">
        <Info className="w-5 h-5 text-amber" />
        <span className="text-sm text-foreground">
          Voter gas rebates for priority gas fees will be capped as of January 14. See updated gas rebate details{" "}
          <a href="#" className="text-amber hover:underline">here</a>.
        </span>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};
