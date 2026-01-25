import { X, ExternalLink, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { VoteItem } from "./VoteTable";
import { useState } from "react";

interface DetailPanelProps {
  item: VoteItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DetailPanel = ({ item, isOpen, onClose }: DetailPanelProps) => {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(item.query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity ${
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
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold">Query Details</h2>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Status Badge */}
          <div className="mb-6">
            {item.status === "ended" ? (
              <Badge className="bg-coral/20 text-coral border-0">Challenge Period Ended</Badge>
            ) : item.status === "pending" ? (
              <Badge className="bg-amber/20 text-amber border-0">Pending Verification</Badge>
            ) : (
              <Badge className="bg-success/20 text-success border-0">Active</Badge>
            )}
          </div>
          
          {/* Query */}
          <div className="mb-8">
            <label className="text-sm text-muted-foreground mb-2 block">Query</label>
            <div className="bg-secondary rounded-lg p-4 flex items-start justify-between gap-4">
              <p className="text-foreground">{item.query}</p>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleCopy}
                className="flex-shrink-0 text-muted-foreground hover:text-foreground"
              >
                {copied ? <CheckCircle className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          {/* Details Grid */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Proposal</label>
                <div className="bg-secondary rounded-lg p-4">
                  <span className="text-foreground font-medium">{item.proposal}</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Bond Amount</label>
                <div className="bg-secondary rounded-lg p-4 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber/20 flex items-center justify-center">
                    <span className="text-xs text-amber">$</span>
                  </div>
                  <span className="text-foreground font-medium">{item.bond} {item.bondToken}</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Timestamp</label>
              <div className="bg-secondary rounded-lg p-4">
                <span className="text-foreground">{item.timestamp}</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Challenge Period</label>
              <div className="bg-secondary rounded-lg p-4">
                <span className="text-foreground">
                  {item.status === "ended" ? "Ended" : item.challengePeriodLeft || "N/A"}
                </span>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="mt-8 space-y-3">
            {item.status === "active" && (
              <Button className="w-full bg-coral hover:bg-coral/90 text-foreground font-medium h-12">
                Dispute Proposal
              </Button>
            )}
            <Button 
              variant="outline" 
              className="w-full border-border text-foreground hover:bg-secondary h-12"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Explorer
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
