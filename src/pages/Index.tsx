import { useState } from "react";
import { TopBanner } from "@/components/TopBanner";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { VoteTimer } from "@/components/VoteTimer";
import { VoteTable, VoteItem } from "@/components/VoteTable";
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
        
        <div className="px-6 pb-12 bg-background">
          <VoteTable items={mockVoteItems} onItemClick={handleItemClick} />
        </div>
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
