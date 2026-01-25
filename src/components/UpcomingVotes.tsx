import { ChevronRight, Calendar } from "lucide-react";

export interface UpcomingVoteItem {
  id: string;
  title: string;
  project: string;
  scheduledDate: string;
}

interface UpcomingVotesProps {
  items: UpcomingVoteItem[];
  onItemClick: (item: UpcomingVoteItem) => void;
}

export const UpcomingVotes = ({ items, onItemClick }: UpcomingVotesProps) => {
  if (items.length === 0) {
    return (
      <div className="px-6 py-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming votes:</h2>
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No upcoming votes scheduled</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming votes:</h2>
      
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[1fr_200px_40px] gap-4 px-4 py-3 text-sm text-muted-foreground border-b border-border">
          <span>Vote</span>
          <span>Scheduled</span>
          <span></span>
        </div>
        
        {/* Table Rows */}
        <div className="divide-y divide-border">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => onItemClick(item)}
              className="grid grid-cols-[1fr_200px_40px] gap-4 px-4 py-4 items-center hover:bg-secondary/50 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber/20 flex items-center justify-center">
                  <span className="text-amber text-lg font-bold">✕</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.project}</p>
                </div>
              </div>
              
              <span className="text-sm text-muted-foreground">{item.scheduledDate}</span>
              
              <ChevronRight className="w-5 h-5 text-amber group-hover:translate-x-1 transition-transform" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
