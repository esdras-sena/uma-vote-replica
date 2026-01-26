import type { ReactNode } from "react";

interface Step {
  number: number;
  title: string;
  description: ReactNode;
  action: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Stake UMBRA",
    description: <>You are staking <span className="font-semibold">0</span> of your <span className="font-semibold">0</span> UMBRA tokens.</>,
    action: "Stake/Unstake",
  },
  {
    number: 2,
    title: "Vote",
    description: <>You have voted in <span className="font-semibold">0</span> votes, and are earning <span className="font-semibold">0% APR</span>.</>,
    action: "Vote history",
  },
  {
    number: 3,
    title: "Get rewards",
    description: <>Your unclaimed UMBRA rewards: <span className="font-semibold">0</span></>,
    action: "Claim",
  },
];

export const HowItWorks = () => {
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
