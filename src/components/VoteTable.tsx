import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface VoteItem {
  id: string;
  query: string;
  timestamp: string;
  proposal: string;
  bond: number;
  bondToken: string;
  status: "active" | "ended" | "pending";
  challengePeriodLeft?: string;
}

interface VoteTableProps {
  items: VoteItem[];
  onItemClick: (item: VoteItem) => void;
}

export const VoteTable = ({ items, onItemClick }: VoteTableProps) => {
  const getStatusBadge = (status: VoteItem["status"], periodLeft?: string) => {
    if (status === "ended") {
      return <Badge className="bg-coral/20 text-coral border-0 hover:bg-coral/30">Ended</Badge>;
    }
    if (status === "pending") {
      return <Badge className="bg-amber/20 text-amber border-0 hover:bg-amber/30">Pending</Badge>;
    }
    return <span className="text-sm text-muted-foreground">{periodLeft}</span>;
  };

  return (
    <div className="px-6">
      <div className="grid grid-cols-[1fr_120px_120px_180px_40px] gap-4 px-4 py-3 text-sm text-muted-foreground border-b border-border">
        <span>Query</span>
        <span>Proposal</span>
        <span>Bond</span>
        <span>Challenge period left</span>
        <span></span>
      </div>
      
      <div className="divide-y divide-border">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onItemClick(item)}
            className="grid grid-cols-[1fr_120px_120px_180px_40px] gap-4 px-4 py-4 items-center hover:bg-secondary/50 cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-mono text-muted-foreground">
                OO
              </div>
              <div>
                <p className="font-medium text-foreground">{item.query}</p>
                <p className="text-sm text-muted-foreground">{item.timestamp}</p>
              </div>
            </div>
            
            <span className="text-foreground">{item.proposal}</span>
            
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-amber/20 flex items-center justify-center">
                <span className="text-xs text-amber">$</span>
              </div>
              <span className="text-foreground">{item.bond}</span>
            </div>
            
            {getStatusBadge(item.status, item.challengePeriodLeft)}
            
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
};
