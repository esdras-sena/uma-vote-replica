import { Info, X } from "lucide-react";
import { useState } from "react";

export const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="flex items-center justify-between px-6 py-3 header-dark text-white">
      <div className="flex items-center gap-3">
        <Info className="w-5 h-5 text-coral" />
        <span className="text-sm">
          Voter gas rebates for priority gas fees will be capped as of January 14. See updated gas rebate details{" "}
          <a href="#" className="text-coral hover:underline">here</a>.
        </span>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="text-white/60 hover:text-white transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};
