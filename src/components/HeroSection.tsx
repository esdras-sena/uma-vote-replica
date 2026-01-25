import { Shield } from "lucide-react";

interface HeroSectionProps {
  statementCount: number;
}

const steps = [
  {
    number: 1,
    text: "Proposers post a bond to assert that a piece of data is correct.",
  },
  {
    number: 2,
    text: "During the challenge period, data proposals are verified and can be disputed.",
  },
  {
    number: 3,
    text: "If correctly disputed, the data is not used and the challenger receives a reward.",
  },
];

export const HeroSection = ({ statementCount }: HeroSectionProps) => {
  return (
    <div className="relative px-6 py-12 gradient-hero rounded-b-3xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
          <Shield className="w-7 h-7 text-primary" />
        </div>
        <h1 className="text-4xl font-semibold">
          Verify <span className="text-primary">{statementCount}</span> statements
        </h1>
      </div>
      
      <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
        <div className="grid grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                {step.number}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
