import { useState } from "react";
import { TopBar } from "@/components/TopBar";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { SearchFilters } from "@/components/SearchFilters";
import { VoteTable, VoteItem } from "@/components/VoteTable";
import { DetailPanel } from "@/components/DetailPanel";

const mockVoteItems: VoteItem[] = [
  {
    id: "1",
    query: "Will Esdras deploy Eclipse Oracle to Starknet mainnet until March 10?",
    timestamp: "01/24/2026, 7:57 AM",
    proposal: "Yes",
    bond: 500,
    bondToken: "USDC",
    status: "ended",
  },
  {
    id: "2",
    query: "Will ETH price exceed $5000 by February 2026?",
    timestamp: "01/23/2026, 2:30 PM",
    proposal: "No",
    bond: 1000,
    bondToken: "USDC",
    status: "active",
    challengePeriodLeft: "2h 15m",
  },
  {
    id: "3",
    query: "Will the new governance proposal pass with 60% approval?",
    timestamp: "01/22/2026, 9:15 AM",
    proposal: "Yes",
    bond: 750,
    bondToken: "USDC",
    status: "pending",
  },
  {
    id: "4",
    query: "Will Arbitrum transaction volume exceed 10M daily by Q1 2026?",
    timestamp: "01/21/2026, 4:45 PM",
    proposal: "Yes",
    bond: 2000,
    bondToken: "USDC",
    status: "active",
    challengePeriodLeft: "5h 30m",
  },
  {
    id: "5",
    query: "Will the protocol reach 100k unique users by March?",
    timestamp: "01/20/2026, 11:00 AM",
    proposal: "No",
    bond: 300,
    bondToken: "USDC",
    status: "ended",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [project, setProject] = useState("all");
  const [oracle, setOracle] = useState("all");
  const [selectedItem, setSelectedItem] = useState<VoteItem | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const filteredItems = mockVoteItems.filter((item) =>
    item.query.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemClick = (item: VoteItem) => {
    setSelectedItem(item);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar timeLeft="12:30:07" voteCount={19} />
      <Navigation />
      <HeroSection statementCount={filteredItems.length} />
      <SearchFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        project={project}
        onProjectChange={setProject}
        oracle={oracle}
        onOracleChange={setOracle}
      />
      <VoteTable items={filteredItems} onItemClick={handleItemClick} />
      <DetailPanel 
        item={selectedItem} 
        isOpen={isPanelOpen} 
        onClose={handleClosePanel} 
      />
    </div>
  );
};

export default Index;
