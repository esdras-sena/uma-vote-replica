import { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export interface VoteItem {
  id: string;
  title: string;
  project: string;
  timestamp: string;
  icon: string;
  status: "requires_signature" | "committed" | "revealed";
}

interface VoteTableProps {
  items: VoteItem[];
  onItemClick: (item: VoteItem) => void;
}

export const VoteTable = ({ items, onItemClick }: VoteTableProps) => {
  const [votes, setVotes] = useState<Record<string, string>>({});

  const handleVoteChange = (itemId: string, value: string) => {
    setVotes(prev => ({
      ...prev,
      [itemId]: value
    }));
  };

  const votedCount = Object.keys(votes).length;
  const totalCount = items.length;

  const handleCommitVotes = () => {
    console.log("Committing votes:", votes);
    // TODO: Implement actual commit logic
  };

  return (
    <div>
      {/* Table Header */}
      <div className="grid grid-cols-[1fr_200px_160px_40px] gap-4 px-4 py-3 text-sm text-muted-foreground border-b border-border">
        <span>Vote</span>
        <span>Your vote</span>
        <span>Vote status</span>
        <span></span>
      </div>
      
      {/* Table Rows */}
      <div className="divide-y divide-border">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onItemClick(item)}
            className="grid grid-cols-[1fr_200px_160px_40px] gap-4 px-4 py-4 items-center hover:bg-secondary/50 cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-amber/20 flex items-center justify-center">
                <span className="text-amber text-lg font-bold">✕</span>
              </div>
              <div>
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.project} | {item.timestamp}</p>
              </div>
            </div>
            
            <Select 
              value={votes[item.id] || ""} 
              onValueChange={(value) => handleVoteChange(item.id, value)}
            >
              <SelectTrigger 
                className="bg-secondary border-border"
                onClick={(e) => e.stopPropagation()}
              >
                <SelectValue placeholder="Choose answer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="invalid">Invalid (p1)</SelectItem>
                <SelectItem value="valid">Valid (p2)</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber" />
              <span className="text-sm text-foreground">Requires signature</span>
            </div>
            
            <ChevronRight className="w-5 h-5 text-amber group-hover:translate-x-1 transition-transform" />
          </div>
        ))}
      </div>

      {/* Commit Vote Button */}
      {votedCount > 0 && (
        <div className="px-4 py-4 border-t border-border">
          <Button 
            onClick={handleCommitVotes}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2"
          >
            Commit {votedCount}/{totalCount} Votes
          </Button>
        </div>
      )}
    </div>
  );
};
