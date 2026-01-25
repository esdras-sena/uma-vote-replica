import { ChevronRight, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface PastVoteItem {
  id: string;
  title: string;
  project: string;
  timestamp: string;
  yourVote: string;
  result: "correct" | "incorrect" | "skipped";
  reward?: number;
}

interface PastVotesProps {
  items: PastVoteItem[];
  onItemClick: (item: PastVoteItem) => void;
}

export const PastVotes = ({ items, onItemClick }: PastVotesProps) => {
  const getResultBadge = (result: PastVoteItem["result"]) => {
    switch (result) {
      case "correct":
        return <Badge className="bg-green-500/20 text-green-400 border-0 hover:bg-green-500/30">Correct</Badge>;
      case "incorrect":
        return <Badge className="bg-red-500/20 text-red-400 border-0 hover:bg-red-500/30">Incorrect</Badge>;
      case "skipped":
        return <Badge className="bg-muted text-muted-foreground border-0 hover:bg-muted">Skipped</Badge>;
    }
  };

  if (items.length === 0) {
    return (
      <div className="px-6 py-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent past votes:</h2>
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <History className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No past votes to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Recent past votes:</h2>
        <a href="#" className="text-amber font-medium hover:underline text-sm">
          View all history
        </a>
      </div>
      
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_150px_120px_100px_40px] gap-4 px-4 py-3 text-sm text-muted-foreground border-b border-border">
          <span>Vote</span>
          <span>Your vote</span>
          <span>Result</span>
          <span>Reward</span>
          <span></span>
        </div>
        
        {/* Table Rows */}
        <div className="divide-y divide-border">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => onItemClick(item)}
              className="grid grid-cols-[1fr_150px_120px_100px_40px] gap-4 px-4 py-4 items-center hover:bg-secondary/50 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-lg font-bold">✕</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.project} | {item.timestamp}</p>
                </div>
              </div>
              
              <span className="text-sm text-foreground">{item.yourVote}</span>
              
              {getResultBadge(item.result)}
              
              <span className="text-sm text-foreground">
                {item.reward !== undefined ? `${item.reward} UMA` : "-"}
              </span>
              
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-amber group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
