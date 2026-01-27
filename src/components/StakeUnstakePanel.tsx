import { useState, useEffect } from "react";
import { useAccount, useSendTransaction } from "@starknet-react/core";
import { Contract, uint256 } from "starknet";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getStakedAmount, getUmbraBalance } from "@/web3/getStakingInfo";
import { loadAbi } from "@/web3/utils/fetchEvents";
import { toast } from "@/hooks/use-toast";

interface StakeUnstakePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VOTE_CONTRACT = import.meta.env.VITE_VOTE_CONTRACT || "0x6975fc84224e0f89bc049ac24e0849cb099379487cf3e3d8c38ddafe62eb8e8";
const UMBRA_CONTRACT = import.meta.env.VITE_UMBRA || "0x32d3cfeb9740cf36ae54d823ff193676f36fa99310c04ad0bc8df8bc5a2028e";

function parseDecimalToU256(value: string, decimals: number = 18): { low: bigint; high: bigint } {
  const cleanValue = value.trim();
  if (!cleanValue || cleanValue === "0") {
    return { low: 0n, high: 0n };
  }

  const parts = cleanValue.split(".");
  const integerPart = parts[0] || "0";
  let fractionalPart = parts[1] || "";
  
  // Pad or truncate fractional part to match decimals
  if (fractionalPart.length > decimals) {
    fractionalPart = fractionalPart.slice(0, decimals);
  } else {
    fractionalPart = fractionalPart.padEnd(decimals, "0");
  }
  
  const combined = integerPart + fractionalPart;
  const rawAmount = BigInt(combined);
  
  // Split into low and high for u256
  const MAX_U128 = 2n ** 128n;
  return {
    low: rawAmount % MAX_U128,
    high: rawAmount / MAX_U128,
  };
}

export const StakeUnstakePanel = ({ open, onOpenChange }: StakeUnstakePanelProps) => {
  const { address } = useAccount();
  const { sendAsync } = useSendTransaction({});
  
  const [activeTab, setActiveTab] = useState<"stake" | "unstake">("stake");
  const [amount, setAmount] = useState("");
  const [understood, setUnderstood] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stakedBalance, setStakedBalance] = useState("0");
  const [unstakedBalance, setUnstakedBalance] = useState("0");

  useEffect(() => {
    if (address && open) {
      Promise.all([getStakedAmount(address), getUmbraBalance(address)])
        .then(([staked, balance]) => {
          setStakedBalance(staked);
          setUnstakedBalance(balance);
        })
        .catch(console.error);
    }
  }, [address, open]);

  const handleMaxClick = () => {
    if (activeTab === "stake") {
      setAmount(unstakedBalance);
    } else {
      setAmount(stakedBalance);
    }
  };

  const handleStake = async () => {
    if (!address || !amount || parseFloat(amount) <= 0) {
      toast({ title: "Invalid amount", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const amountU256 = parseDecimalToU256(amount);
      
      // Load ABIs
      const [umbraAbi, voteAbi] = await Promise.all([
        loadAbi(UMBRA_CONTRACT),
        loadAbi(VOTE_CONTRACT),
      ]);

      // Create contract instances for call building
      const umbraContract = new Contract({ abi: umbraAbi, address: UMBRA_CONTRACT });
      const voteContract = new Contract({ abi: voteAbi, address: VOTE_CONTRACT });

      // Build multicall: approve + stake
      const approveCall = umbraContract.populate("approve", [VOTE_CONTRACT, uint256.bnToUint256(amountU256.low + (amountU256.high << 128n))]);
      const stakeCall = voteContract.populate("stake", [uint256.bnToUint256(amountU256.low + (amountU256.high << 128n))]);

      // Execute multicall
      await sendAsync([approveCall, stakeCall]);

      toast({ title: "Stake successful!", description: `Staked ${amount} UMBRA` });
      setAmount("");
      setUnderstood(false);
      onOpenChange(false);
    } catch (err) {
      console.error("Stake failed:", err);
      toast({ title: "Stake failed", description: String(err), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnstake = async () => {
    if (!address || !amount || parseFloat(amount) <= 0) {
      toast({ title: "Invalid amount", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const amountU256 = parseDecimalToU256(amount);
      
      const voteAbi = await loadAbi(VOTE_CONTRACT);
      const voteContract = new Contract({ abi: voteAbi, address: VOTE_CONTRACT });

      const unstakeCall = voteContract.populate("request_unstake", [uint256.bnToUint256(amountU256.low + (amountU256.high << 128n))]);

      await sendAsync([unstakeCall]);

      toast({ title: "Unstake requested!", description: `Requested unstake of ${amount} UMBRA` });
      setAmount("");
      setUnderstood(false);
      onOpenChange(false);
    } catch (err) {
      console.error("Unstake failed:", err);
      toast({ title: "Unstake failed", description: String(err), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const isStakeDisabled = !understood || !amount || parseFloat(amount) <= 0 || isLoading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-lg font-semibold">Stake / Unstake</DialogTitle>
        </DialogHeader>
        
        {/* Balance Banner */}
        <div className="bg-primary flex">
          <div className="flex-1 py-4 text-center border-r border-primary-foreground/20">
            <div className="text-primary-foreground/80 text-sm">Staked balance</div>
            <div className="text-primary-foreground text-3xl font-bold mt-1">
              {parseFloat(stakedBalance).toLocaleString(undefined, { maximumFractionDigits: 4 })}
            </div>
          </div>
          <div className="flex-1 py-4 text-center">
            <div className="text-primary-foreground/80 text-sm">Unstaked balance</div>
            <div className="text-primary-foreground text-3xl font-bold mt-1">
              {parseFloat(unstakedBalance).toLocaleString(undefined, { maximumFractionDigits: 4 })}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "stake" | "unstake")} className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
            <TabsTrigger 
              value="stake" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-6 py-3"
            >
              Stake
            </TabsTrigger>
            <TabsTrigger 
              value="unstake" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-6 py-3"
            >
              Unstake
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stake" className="p-6 mt-0">
            <h3 className="font-semibold text-lg mb-2">Stake</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Staked tokens are used to vote and earn rewards. Staked tokens cannot be claimed until 7 days after an unstaking request is submitted.
            </p>

            {/* Amount Input */}
            <div className="flex items-center gap-3 border rounded-lg p-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                U
              </div>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0 flex-1"
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleMaxClick}
                className="text-primary border-primary hover:bg-primary/10"
              >
                Max
              </Button>
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-3 mb-6">
              <Checkbox 
                id="understand-stake" 
                checked={understood} 
                onCheckedChange={(checked) => setUnderstood(checked as boolean)}
              />
              <label htmlFor="understand-stake" className="text-sm text-muted-foreground cursor-pointer">
                I understand that once staked, I will not be able to reclaim my tokens until 7 days after my unstaking request is submitted.
              </label>
            </div>

            {/* Stake Button */}
            <Button 
              onClick={handleStake}
              disabled={isStakeDisabled}
              className="w-full bg-primary/20 text-primary hover:bg-primary/30 disabled:bg-primary/10 disabled:text-primary/50"
            >
              {isLoading ? "Staking..." : "Stake"}
            </Button>
          </TabsContent>

          <TabsContent value="unstake" className="p-6 mt-0">
            <h3 className="font-semibold text-lg mb-2">Unstake</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Request to unstake your tokens. After requesting, you must wait 7 days before you can execute the unstake and withdraw your tokens.
            </p>

            {/* Amount Input */}
            <div className="flex items-center gap-3 border rounded-lg p-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                U
              </div>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0 flex-1"
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleMaxClick}
                className="text-primary border-primary hover:bg-primary/10"
              >
                Max
              </Button>
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-3 mb-6">
              <Checkbox 
                id="understand-unstake" 
                checked={understood} 
                onCheckedChange={(checked) => setUnderstood(checked as boolean)}
              />
              <label htmlFor="understand-unstake" className="text-sm text-muted-foreground cursor-pointer">
                I understand that I must wait 7 days after requesting unstake before I can withdraw my tokens.
              </label>
            </div>

            {/* Unstake Button */}
            <Button 
              onClick={handleUnstake}
              disabled={isStakeDisabled}
              className="w-full bg-primary/20 text-primary hover:bg-primary/30 disabled:bg-primary/10 disabled:text-primary/50"
            >
              {isLoading ? "Requesting..." : "Request Unstake"}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
