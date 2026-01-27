import { useState } from "react";
import { useAccount, useSendTransaction } from "@starknet-react/core";
import { CallData } from "starknet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface ClaimPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  claimableRewards: string;
}

const VOTE_CONTRACT = import.meta.env.VITE_VOTE_CONTRACT || "0x6975fc84224e0f89bc049ac24e0849cb099379487cf3e3d8c38ddafe62eb8e8";

export const ClaimPanel = ({ open, onOpenChange, claimableRewards }: ClaimPanelProps) => {
  const { address } = useAccount();
  const { sendAsync } = useSendTransaction({});
  const [isLoading, setIsLoading] = useState(false);

  const handleClaimAndStake = async () => {
    if (!address) {
      toast({ title: "Wallet not connected", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      // withdraw_and_restake expects a priceRequestId: felt252
      // Passing 0 as the priceRequestId for general rewards claim
      const calls = [
        {
          contractAddress: VOTE_CONTRACT,
          entrypoint: "withdraw_and_restake",
          calldata: CallData.compile({ priceRequestId: 0 }),
        },
      ];

      await sendAsync(calls);

      toast({ title: "Claim and Stake successful!", description: `Rewards have been claimed and restaked` });
      onOpenChange(false);
    } catch (err) {
      console.error("Claim and Stake failed:", err);
      toast({ title: "Claim and Stake failed", description: String(err), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaimToWallet = async () => {
    if (!address) {
      toast({ title: "Wallet not connected", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      // withdraw_rewards takes no inputs
      const calls = [
        {
          contractAddress: VOTE_CONTRACT,
          entrypoint: "withdraw_rewards",
          calldata: CallData.compile({}),
        },
      ];

      await sendAsync(calls);

      toast({ title: "Claim to Wallet successful!", description: `Rewards have been claimed to your wallet` });
      onOpenChange(false);
    } catch (err) {
      console.error("Claim to Wallet failed:", err);
      toast({ title: "Claim to Wallet failed", description: String(err), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const hasRewards = parseFloat(claimableRewards) > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-lg font-semibold">Claim</DialogTitle>
          <DialogDescription className="sr-only">Claim your UMBRA rewards</DialogDescription>
        </DialogHeader>

        {/* Rewards Banner */}
        <div className="bg-primary py-6 text-center">
          <div className="text-primary-foreground/80 text-sm">Claimable Rewards</div>
          <div className="text-primary-foreground text-3xl font-bold mt-1">
            {parseFloat(claimableRewards).toLocaleString(undefined, { maximumFractionDigits: 4 })} UMBRA
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Claim and Stake Section */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Claim and Stake</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Compound your UMBRA by claiming and restaking your rewards.
            </p>
            <Button
              onClick={handleClaimAndStake}
              disabled={isLoading || !hasRewards}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? "Processing..." : "Claim and Stake"}
            </Button>
          </div>

          {/* Claim to Wallet Section */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Claim to Wallet</h3>
            <p className="text-muted-foreground text-sm mb-4">
              You will not be able to vote or earn rewards with UMBRA claimed to your wallet.
            </p>
            <Button
              onClick={handleClaimToWallet}
              disabled={isLoading || !hasRewards}
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary/10 disabled:opacity-50"
            >
              {isLoading ? "Processing..." : "Claim to Wallet"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
