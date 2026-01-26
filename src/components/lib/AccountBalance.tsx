import { useBalance } from "@starknet-react/core";

interface AccountBalanceProps {
  address: string;
  heading?: boolean;
}

const AccountBalance = ({ address, heading = true }: AccountBalanceProps) => {
  const { data: ethBalance, isLoading: ethLoading } = useBalance({
    address: address as `0x${string}`,
  });

  if (!address) return null;

  return (
    <div className="space-y-2">
      {heading && <h4 className="text-sm text-muted-foreground mb-2">Balance</h4>}
      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
            <span className="text-xs">Ξ</span>
          </div>
          <span className="text-sm font-medium">ETH</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {ethLoading ? "..." : ethBalance?.formatted ? `${Number(ethBalance.formatted).toFixed(4)}` : "0.0000"}
        </span>
      </div>
    </div>
  );
};

export default AccountBalance;
