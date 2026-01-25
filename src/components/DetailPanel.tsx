import { X, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VoteItem } from "./VoteTable";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface DetailPanelProps {
  item: VoteItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DetailPanel = ({ item, isOpen, onClose }: DetailPanelProps) => {
  const [activeTab, setActiveTab] = useState("details");

  if (!item) return null;

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
                <p className="text-sm text-muted-foreground">{item.project}</p>
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
            
            <TabsContent value="details" className="mt-0">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline" className="bg-secondary border-border text-foreground">
                  <span className="mr-1.5 text-amber">◎</span>
                  Eclipse
                </Badge>
                <Badge variant="outline" className="bg-secondary border-border text-foreground">
                  <span className="mr-1.5">◎</span>
                  Managed Optimistic Oracle v2
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
                  If the assertion is disputed, this market will remain open until the dispute has been resolved. If no dispute is raised within the challenge period, the assertion will be accepted as valid.
                </p>
                <p>
                  market_id: {item.id}92847 res_data: p1: 0, p2: 1, p3: 0.5. Where p1 corresponds to Invalid, p2 to Valid, p3 to unknown/50-50. Updates made by the question creator via the bulletin board at 0x65070BE91477460D8A7AeEb94ef92fe056C2f2A7 as described by{" "}
                  <a 
                    href="https://eclipsescan.xyz" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-coral hover:underline break-all"
                  >
                    https://eclipsescan.xyz/tx/0xa14f01b115c4913624fc3f508f960f4dea252758e73c28f5f07f8e19d7bca066
                  </a>
                  {" "}should be considered.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="discord-summary" className="mt-0">
              <div className="text-muted-foreground text-sm">
                No Discord summary available for this vote.
              </div>
            </TabsContent>
            
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
