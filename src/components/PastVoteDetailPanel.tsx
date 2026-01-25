import { X, RotateCcw, FileText, Link2, SquareCheck, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PastVoteItem } from "./PastVotes";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface PastVoteDetailPanelProps {
  item: PastVoteItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PastVoteDetailPanel = ({ item, isOpen, onClose }: PastVoteDetailPanelProps) => {
  const [activeTab, setActiveTab] = useState("result");
  const [ancillaryView, setAncillaryView] = useState<"decoded" | "raw">("decoded");

  if (!item) return null;

  // Mock voting results data
  const votingResults = [
    { label: "Valid", percentage: 0, votes: 308.48, color: "bg-coral/30" },
    { label: "Early request", percentage: 100, votes: 25270241.73, color: "bg-coral" },
  ];

  const totalVotes = votingResults.reduce((sum, r) => sum + r.votes, 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div 
        className={`fixed right-0 top-0 h-full w-full max-w-xl bg-card border-l border-border z-50 overflow-y-auto transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber/20 flex items-center justify-center">
                <span className="text-amber text-lg font-bold">✕</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">{item.title}</h2>
                <p className="text-sm text-muted-foreground">{item.project} | Vote number <span className="text-amber">#{item.id}</span></p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0 mb-6">
              <TabsTrigger 
                value="result" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 py-2"
              >
                Result
              </TabsTrigger>
              <TabsTrigger 
                value="details" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 py-2"
              >
                Details
              </TabsTrigger>
              <TabsTrigger 
                value="discord-summary" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 py-2"
              >
                Discord Summary
              </TabsTrigger>
              <TabsTrigger 
                value="discord-comments" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 py-2"
              >
                Discord Comments
              </TabsTrigger>
            </TabsList>
            
            {/* Result Tab */}
            <TabsContent value="result" className="mt-0">
              <div className="flex items-center gap-2 text-foreground mb-6">
                <RotateCcw className="w-4 h-4 text-coral" />
                <span className="font-medium">Result</span>
              </div>
              
              {/* Donut Chart */}
              <div className="flex items-center gap-8 mb-8">
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="hsl(var(--coral) / 0.3)"
                      strokeWidth="12"
                    />
                    {/* Foreground circle - 100% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="hsl(var(--coral))"
                      strokeWidth="12"
                      strokeDasharray={`${100 * 2.51} ${100 * 2.51}`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                
                <div className="space-y-4">
                  {votingResults.map((result, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${result.color}`} />
                      <div>
                        <p className="text-foreground text-sm">{result.label}</p>
                        <p className="text-foreground font-semibold">
                          {result.percentage.toFixed(2)}% 
                          <span className="text-muted-foreground font-normal ml-1">
                            ({result.votes.toLocaleString()})
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Details Tab */}
            <TabsContent value="details" className="mt-0">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline" className="bg-secondary border-border text-foreground">
                  <span className="mr-1.5">◎</span>
                  Optimistic Oracle Managed
                </Badge>
                <Badge variant="outline" className="bg-secondary border-border text-foreground">
                  YES_OR_NO_QUERY
                </Badge>
              </div>
              
              {/* Description Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-foreground">
                  <FileText className="w-4 h-4" />
                  <span className="font-medium">Description</span>
                </div>
                <a 
                  href="#" 
                  className="flex items-center gap-1.5 text-sm text-amber hover:underline"
                >
                  <span className="w-4 h-4 rounded-full bg-amber/20 flex items-center justify-center text-xs">◎</span>
                  See on {item.project}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              
              {/* Description Content */}
              <div className="text-foreground text-sm leading-relaxed space-y-4">
                <p>
                  This assertion relates to the {item.title} oracle request, submitted on {item.timestamp}.
                </p>
                <p>
                  The data asserted is accurate according to the specified oracle parameters and verification criteria established by the {item.project} protocol.
                </p>
                <p>
                  The voting period has concluded and the result has been finalized.
                </p>
              </div>
              
              {/* Ancillary Data Section */}
              <div className="mt-8 border-t border-border pt-6">
                <div className="flex items-center gap-2 text-foreground mb-4">
                  <Link2 className="w-4 h-4 text-coral" />
                  <span className="font-medium">Ancillary Data</span>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setAncillaryView("decoded")}
                    className={`text-sm ${ancillaryView === "decoded" ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    View Decoded
                  </button>
                  <button
                    onClick={() => setAncillaryView("raw")}
                    className={`text-sm ${ancillaryView === "raw" ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    View Raw
                  </button>
                </div>
                {ancillaryView === "decoded" && (
                  <div className="mt-3 text-sm text-muted-foreground bg-secondary rounded-lg p-3">
                    Decoded ancillary data will be displayed here.
                  </div>
                )}
                {ancillaryView === "raw" && (
                  <div className="mt-3 text-sm text-muted-foreground bg-secondary rounded-lg p-3 font-mono break-all">
                    0x7b226d61726b65745f6964223a22313136333936392...
                  </div>
                )}
              </div>
              
              {/* Voting Options Section */}
              <div className="mt-8 border-t border-border pt-6">
                <div className="flex items-center gap-2 text-foreground mb-4">
                  <SquareCheck className="w-4 h-4 text-coral" />
                  <span className="font-medium">Voting options</span>
                </div>
                <div className="space-y-2 text-sm text-foreground">
                  <p>Under</p>
                  <p>Over</p>
                  <p>unknown/50-50</p>
                  <p>Early request</p>
                  <p>Custom</p>
                </div>
              </div>
              
              {/* Proposal Timestamp Section */}
              <div className="mt-8 border-t border-border pt-6">
                <div className="flex items-center gap-2 text-foreground mb-4">
                  <Clock className="w-4 h-4 text-coral" />
                  <span className="font-medium">Proposal Timestamp</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-4">
                    <span className="text-muted-foreground w-12">UTC</span>
                    <span className="text-foreground">Sat, 24 Jan 2026 15:19:48 GMT</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-muted-foreground w-12">UNIX</span>
                    <span className="text-foreground">1769267988</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Discord Summary Tab */}
            <TabsContent value="discord-summary" className="mt-0">
              <div className="text-muted-foreground text-sm">
                No Discord summary available for this vote.
              </div>
            </TabsContent>
            
            {/* Discord Comments Tab */}
            <TabsContent value="discord-comments" className="mt-0">
              <div className="text-muted-foreground text-sm">
                No Discord comments available for this vote.
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};
