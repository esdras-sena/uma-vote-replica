import { ChevronRight, History } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { PastVoteItem } from "@/components/PastVotes";
import { VotingRoundBanner } from "@/components/VotingRoundBanner";
import { Badge } from "@/components/ui/badge";

const mockPastVotes: PastVoteItem[] = [
  {
    id: "p1",
    title: "Across V2 Migration",
    project: "Across",
    timestamp: "2026-01-20, 4:30 PM",
    yourVote: "Valid (p2)",
    result: "correct",
    reward: 0.45,
  },
  {
    id: "p2",
    title: "Polymarket Oracle Update",
    project: "Polymarket",
    timestamp: "2026-01-18, 2:15 PM",
    yourVote: "Invalid (p1)",
    result: "incorrect",
  },
  {
    id: "p3",
    title: "Sherlock Coverage Claim",
    project: "Sherlock",
    timestamp: "2026-01-15, 11:00 AM",
    yourVote: "Valid (p2)",
    result: "correct",
    reward: 0.32,
  },
  {
    id: "p4",
    title: "UMBRA Treasury Allocation",
    project: "UMBRA",
    timestamp: "2026-01-12, 5:45 PM",
    yourVote: "-",
    result: "skipped",
  },
  {
    id: "p5",
    title: "Optimism Bridge Upgrade",
    project: "Optimism",
    timestamp: "2026-01-10, 3:00 PM",
    yourVote: "Valid (p2)",
    result: "correct",
    reward: 0.28,
  },
  {
    id: "p6",
    title: "Arbitrum DAO Proposal",
    project: "Arbitrum",
    timestamp: "2026-01-08, 1:30 PM",
    yourVote: "Valid (p2)",
    result: "correct",
    reward: 0.51,
  },
  {
    id: "p7",
    title: "Base Protocol Vote",
    project: "Base",
    timestamp: "2026-01-05, 10:00 AM",
    yourVote: "Invalid (p1)",
    result: "incorrect",
  },
];

const PastVotesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab="past" />
      
      <div className="max-w-6xl mx-auto py-8">
        <div className="px-6 mb-6">
          <VotingRoundBanner 
            timeLeft="1 day" 
            onRemindMe={() => console.log("Remind me clicked")} 
          />
        </div>
        
        <div className="px-6 mb-6">
          <h1 className="text-2xl font-bold text-foreground">Past Votes</h1>
          <p className="text-muted-foreground mt-1">
            View your complete voting history and rewards.
          </p>
        </div>
        
        <PastVotesFullList 
          items={mockPastVotes} 
          onItemClick={(item) => console.log("Past vote clicked:", item)} 
        />
      </div>
    </div>
  );
};

// Full list variant without the "View all" link
const PastVotesFullList = ({ items, onItemClick }: { items: PastVoteItem[], onItemClick: (item: PastVoteItem) => void }) => {
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
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <History className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No past votes to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
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
                {item.reward !== undefined ? `${item.reward} UMBRA` : "-"}
              </span>
              
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-amber group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastVotesPage;
