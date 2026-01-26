import { useEffect, useState, type ReactNode } from "react";
import { getStakedAmount, getUmbraBalance } from "@/web3/getStakingInfo";
import { getApr } from "@/web3/getApr";

interface Step {
  number: number;
  title: string;
  description: ReactNode;
  action: string;
}

interface HowItWorksProps {
  userAddress?: string;
}

export const HowItWorks = ({ userAddress }: HowItWorksProps) => {
  const [stakedAmount, setStakedAmount] = useState<string>("0");
  const [umbraBalance, setUmbraBalance] = useState<string>("0");
  const [apr, setApr] = useState<string>("0");

  useEffect(() => {
    // Fetch APR (doesn't need user address)
    getApr()
      .then((value) => {
        if (value) setApr(value);
      })
      .catch((err) => console.error("Failed to fetch APR:", err));
  }, []);

  useEffect(() => {
    if (userAddress) {
      // Fetch staking info when user address is available
      Promise.all([
        getStakedAmount(userAddress),
        getUmbraBalance(userAddress),
      ])
        .then(([staked, balance]) => {
          setStakedAmount(staked);
          setUmbraBalance(balance);
        })
        .catch((err) => console.error("Failed to fetch staking info:", err));
    }
  }, [userAddress]);

  const steps: Step[] = [
    {
      number: 1,
      title: "Stake UMBRA",
      description: <>You are staking <span className="font-semibold">{stakedAmount}</span> of your <span className="font-semibold">{umbraBalance}</span> UMBRA tokens.</>,
      action: "Stake/Unstake",
    },
    {
      number: 2,
      title: "Vote",
      description: <>You have voted in <span className="font-semibold">0</span> votes, and are earning <span className="font-semibold">{apr}% APR</span>.</>,
      action: "Vote history",
    },
    {
      number: 3,
      title: "Get rewards",
      description: <>Your unclaimed UMBRA rewards: <span className="font-semibold">0</span></>,
      action: "Claim",
    },
  ];

  return (
    <div className="px-6 py-8 bg-background">
      <h2 className="text-lg font-semibold text-foreground mb-4">How it works:</h2>
      
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        {steps.map((step, index) => (
          <div 
            key={step.number}
            className={`flex items-center ${index !== steps.length - 1 ? "border-b border-border" : ""}`}
          >
            <div className="flex items-center gap-3 px-5 py-4 bg-secondary min-w-[180px]">
              <div className="w-6 h-6 rounded-full bg-amber text-primary-foreground flex items-center justify-center text-xs font-medium">
                {step.number}
              </div>
              <span className="font-medium text-foreground">{step.title}</span>
            </div>
            <div className="flex-1 px-5 py-4 flex items-center justify-between">
              <span className="text-muted-foreground">{step.description}</span>
              <a href="#" className="text-amber font-medium hover:underline text-sm">
                {step.action}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
