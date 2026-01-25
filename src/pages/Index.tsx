import { useState } from "react";
import { TopBanner } from "@/components/TopBanner";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { VoteTimer } from "@/components/VoteTimer";
import { VoteTable, VoteItem } from "@/components/VoteTable";
import { UpcomingVotes, UpcomingVoteItem } from "@/components/UpcomingVotes";
import { PastVotes, PastVoteItem } from "@/components/PastVotes";
import { DetailPanel } from "@/components/DetailPanel";

const mockVoteItems: VoteItem[] = [
  {
    id: "1",
    title: "Across V2",
    project: "Across",
    timestamp: "2026-01-24, 6:20 PM",
    icon: "✕",
    status: "requires_signature",
  },
  {
    id: "2",
    title: "Across V2",
    project: "Across",
    timestamp: "2026-01-24, 5:05 PM",
    icon: "✕",
    status: "requires_signature",
  },
  {
    id: "3",
    title: "Across V2",
    project: "Across",
    timestamp: "2026-01-24, 3:30 PM",
    icon: "✕",
    status: "requires_signature",
  },
  {
    id: "4",
    title: "Polymarket Resolution",
    project: "Polymarket",
    timestamp: "2026-01-24, 2:15 PM",
    icon: "✕",
    status: "requires_signature",
  },
  {
    id: "5",
    title: "Sherlock Audit",
    project: "Sherlock",
    timestamp: "2026-01-24, 1:00 PM",
    icon: "✕",
    status: "requires_signature",
  },
];

const mockUpcomingVotes: UpcomingVoteItem[] = [
  {
    id: "u1",
    title: "Optimism Governance",
    project: "Optimism",
    scheduledDate: "Jan 26, 2026 at 12:00 PM",
  },
  {
    id: "u2",
    title: "Arbitrum DAO Proposal",
    project: "Arbitrum",
    scheduledDate: "Jan 27, 2026 at 3:00 PM",
  },
  {
    id: "u3",
    title: "Base Protocol Upgrade",
    project: "Base",
    scheduledDate: "Jan 28, 2026 at 9:00 AM",
  },
];

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
    title: "UMA Treasury Allocation",
    project: "UMA",
    timestamp: "2026-01-12, 5:45 PM",
    yourVote: "-",
    result: "skipped",
  },
];

const Index = () => {
  const [selectedItem, setSelectedItem] = useState<VoteItem | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleItemClick = (item: VoteItem) => {
    setSelectedItem(item);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      <Navigation />
      <HeroSection />
      
      <div className="max-w-6xl mx-auto">
        <HowItWorks />
        
        {/* Active Votes Section */}
        <div className="px-6 py-8 bg-background">
          <h2 className="text-lg font-semibold text-foreground mb-4">Active votes:</h2>
          <VoteTimer commitTimeLeft="10 hours" revealTimeLeft="10 hours" />
        </div>
        
        <div className="px-6 pb-4 bg-background">
          <VoteTable items={mockVoteItems} onItemClick={handleItemClick} />
        </div>
        
        {/* Upcoming Votes Section */}
        <UpcomingVotes 
          items={mockUpcomingVotes} 
          onItemClick={(item) => console.log("Upcoming vote clicked:", item)} 
        />
        
        {/* Past Votes Section */}
        <PastVotes 
          items={mockPastVotes} 
          onItemClick={(item) => console.log("Past vote clicked:", item)} 
        />
      </div>
      
      <DetailPanel 
        item={selectedItem} 
        isOpen={isPanelOpen} 
        onClose={handleClosePanel} 
      />
    </div>
  );
};

export default Index;
