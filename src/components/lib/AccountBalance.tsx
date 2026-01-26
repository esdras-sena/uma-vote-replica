import { useReadContract } from "@starknet-react/core";
import Erc20Abi from "./token.abi.json";
import { formatCurrency } from "./helpers";
import type { Abi } from "starknet";

type Props = {
  address: string;
  heading?: boolean;
};

function AccountBalance({ address, heading = true }: Props) {
  const { data: eth, isLoading: ethLoading, error: ethError } = useReadContract({
    address: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    abi: Erc20Abi as unknown as Abi,
    functionName: "balanceOf",
    args: [address!] as const,
    enabled: !!address,
  });

  const { data: strk, isLoading: strkLoading, error: strkError } = useReadContract({
    address: "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
    abi: Erc20Abi as unknown as Abi,
    functionName: "balanceOf",
    args: [address!] as const,
    enabled: !!address,
  });

  // Safely extract balance values
  let ethBalance = "0";
  let strkBalance = "0";
  
  try {
    const ethData = eth as any;
    if (ethData?.balance?.low) {
      ethBalance = formatCurrency(ethData.balance.low.toString());
    } else if (ethData && typeof ethData === 'bigint') {
      ethBalance = formatCurrency(ethData.toString());
    }
  } catch (e) {
    console.log("ETH balance parse error:", e);
  }

  try {
    const strkData = strk as any;
    if (strkData?.balance?.low) {
      strkBalance = formatCurrency(strkData.balance.low.toString());
    } else if (strkData && typeof strkData === 'bigint') {
      strkBalance = formatCurrency(strkData.toString());
    }
  } catch (e) {
    console.log("STRK balance parse error:", e);
  }

  // Show error state if there's an ABI issue
  if (ethError || strkError) {
    return (
      <div className="p-3 text-sm bg-card border border-border rounded-md">
        {heading && <h3 className="mb-4 text-sm text-muted-foreground">Balance</h3>}
        <div className="flex flex-col gap-4 text-card-foreground">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="h-7 w-7 rounded-full md:h-9 md:w-9 bg-blue-500/20 flex items-center justify-center">
                <span className="text-sm">Ξ</span>
              </div>
              <span className="text-sm font-medium">ETH</span>
            </div>
            <span className="text-sm text-muted-foreground">—</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 text-sm bg-card border border-border rounded-md">
      {heading && <h3 className="mb-4 text-sm text-muted-foreground">Balance</h3>}

      <div className="flex flex-col gap-4 text-card-foreground">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <div className="h-7 w-7 rounded-full md:h-9 md:w-9 bg-blue-500/20 flex items-center justify-center">
              <span className="text-sm">Ξ</span>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">ETH</p>
              <p className="text-xs text-muted-foreground">Ethereum</p>
            </div>
          </div>
          <div className="mr-4 flex items-center">
            <p className="font-mono text-sm">
              {ethLoading ? "..." : Number(ethBalance).toFixed(4)}
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <div className="h-7 w-7 rounded-full md:h-9 md:w-9 bg-purple-500/20 flex items-center justify-center">
              <span className="text-sm">◆</span>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">STRK</p>
              <p className="text-xs text-muted-foreground">Starknet token</p>
            </div>
          </div>
          <div className="mr-4 flex items-center">
            <p className="font-mono text-sm">
              {strkLoading ? "..." : Number(strkBalance).toFixed(4)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountBalance;
