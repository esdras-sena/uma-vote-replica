import { X, ExternalLink, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VoteItem } from "./VoteTable";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DetailPanelProps {
  item: VoteItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DetailPanel = ({ item, isOpen, onClose }: DetailPanelProps) => {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(item.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-foreground">Vote Details</h2>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Project Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-amber/20 flex items-center justify-center">
              <span className="text-amber text-xl font-bold">✕</span>
            </div>
            <div>
              <p className="font-semibold text-foreground text-lg">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.project} | {item.timestamp}</p>
            </div>
          </div>
          
          {/* Query */}
          <div className="mb-6">
            <label className="text-sm text-muted-foreground mb-2 block">Assertion</label>
            <div className="bg-secondary rounded-lg p-4 flex items-start justify-between gap-4">
              <p className="text-foreground text-sm">
                The data asserted is accurate according to the specified oracle parameters and verification criteria.
              </p>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleCopy}
                className="flex-shrink-0 text-muted-foreground hover:text-foreground"
              >
                {copied ? <CheckCircle className="w-4 h-4 text-amber" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          {/* Vote Selection */}
          <div className="mb-6">
            <label className="text-sm text-muted-foreground mb-2 block">Your Vote</label>
            <Select>
              <SelectTrigger className="w-full bg-card border-border h-12">
                <SelectValue placeholder="Choose answer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="invalid">Invalid (p1)</SelectItem>
                <SelectItem value="valid">Valid (p2)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Status */}
          <div className="mb-8">
            <label className="text-sm text-muted-foreground mb-2 block">Status</label>
            <div className="bg-secondary rounded-lg p-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber" />
              <span className="text-foreground">Requires signature</span>
            </div>
          </div>
          
          {/* Actions */}
          <div className="space-y-3">
            <Button className="w-full bg-amber hover:bg-amber/90 text-primary-foreground font-medium h-12 rounded-full">
              Sign & Commit Vote
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-border text-foreground hover:bg-secondary h-12 rounded-full"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Etherscan
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
