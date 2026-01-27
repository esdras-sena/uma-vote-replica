import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { UpcomingVotes, UpcomingVoteItem } from "@/components/UpcomingVotes";
import { VotingRoundBanner } from "@/components/VotingRoundBanner";
import { StakeUnstakePanel } from "@/components/StakeUnstakePanel";

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
  {
    id: "u4",
    title: "UMBRA Treasury Vote",
    project: "UMBRA",
    scheduledDate: "Jan 29, 2026 at 2:00 PM",
  },
  {
    id: "u5",
    title: "Polymarket Resolution",
    project: "Polymarket",
    scheduledDate: "Jan 30, 2026 at 10:00 AM",
  },
  {
    id: "u6",
    title: "Sherlock Coverage Update",
    project: "Sherlock",
    scheduledDate: "Jan 31, 2026 at 4:00 PM",
  },
];

const UpcomingVotesPage = () => {
  const [stakeModalOpen, setStakeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab="upcoming" />
      
      <div className="max-w-6xl mx-auto py-8">
        <div className="px-6 mb-6">
          <VotingRoundBanner 
            timeLeft="1 day" 
            onRemindMe={() => console.log("Remind me clicked")} 
            onStakeClick={() => setStakeModalOpen(true)}
          />
        </div>
        
        <div className="px-6 mb-6">
          <h1 className="text-2xl font-bold text-foreground">Upcoming Votes</h1>
          <p className="text-muted-foreground mt-1">
            View all scheduled votes that will be available for voting soon.
          </p>
        </div>
        
        <UpcomingVotes 
          items={mockUpcomingVotes} 
          onItemClick={(item) => console.log("Upcoming vote clicked:", item)} 
        />
      </div>

      <StakeUnstakePanel open={stakeModalOpen} onOpenChange={setStakeModalOpen} />
    </div>
  );
};

export default UpcomingVotesPage;
