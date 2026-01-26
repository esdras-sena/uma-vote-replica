import { useEffect, useState } from "react";
import { getApr } from "@/web3/getApr";

export const HeroSection = () => {
  const [apr, setApr] = useState<string>("--");

  useEffect(() => {
    getApr()
      .then((value) => {
        if (value) setApr(value);
      })
      .catch((err) => {
        console.error("Failed to fetch APR:", err);
      });
  }, []);

  return (
    <div className="px-6 py-10 gradient-hero">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground">
        Stake, vote & earn up to <span className="text-amber">{apr}% APR</span>
      </h1>
    </div>
  );
};
