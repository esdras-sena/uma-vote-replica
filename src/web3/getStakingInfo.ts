import { RpcProvider, Contract } from 'starknet';
import { getNodeUrl } from "./utils/network";
import { loadAbi } from './utils/fetchEvents';

const provider = new RpcProvider({ nodeUrl: getNodeUrl() });

function formatBigIntToDecimal(rawAmount: bigint, decimals: number = 18): string {
  if (rawAmount === 0n) return "0";
  
  const divisor = 10n ** BigInt(decimals);
  const integerPart = rawAmount / divisor;
  const fractionalPart = rawAmount % divisor;
  
  if (fractionalPart === 0n) {
    return integerPart.toString();
  }
  
  // Pad fractional part with leading zeros
  let fractionalStr = fractionalPart.toString().padStart(decimals, '0');
  // Remove trailing zeros
  fractionalStr = fractionalStr.replace(/0+$/, '');
  
  return `${integerPart}.${fractionalStr}`;
}

export async function getStakedAmount(userAddress: string): Promise<string> {
  if (!userAddress) return "0";
  
  const voteAddr = import.meta.env.VITE_VOTE_CONTRACT || "0x1cf58617e3b5844360ec31dcd73ec50a4240f2591f88a250bc457613bcfd678";
  
  try {
    const abi = await loadAbi(voteAddr);
    const voteContract = new Contract({ abi, address: voteAddr, providerOrAccount: provider });
    const stakedAmount = await voteContract.voter_stakes(userAddress);

    // voter_stakes returns VoterStake struct; stake is u128 (see vote ABI)
    let stakeValue: unknown = 0;
    if (typeof stakedAmount === "object" && stakedAmount !== null) {
      const asAny = stakedAmount as any;
      stakeValue = asAny.stake ?? asAny[0] ?? 0;
    } else {
      stakeValue = stakedAmount ?? 0;
    }

    let rawAmount: bigint;
    if (typeof stakeValue === "bigint") rawAmount = stakeValue;
    else if (typeof stakeValue === "number") rawAmount = BigInt(stakeValue);
    else if (typeof stakeValue === "string") rawAmount = BigInt(stakeValue);
    else rawAmount = 0n;
    
    return formatBigIntToDecimal(rawAmount);
  } catch (err) {
    console.error("Failed to fetch staked amount:", err);
    return "0";
  }
}

export async function getUmbraBalance(userAddress: string): Promise<string> {
  if (!userAddress) return "0";
  
  const umbraAddr = import.meta.env.VITE_UMBRA || "0x6acfb04a42c6d312a2390cd968dcca357df4d9fd87e1949cccade879691d8ec";
  
  try {
    const abi = await loadAbi(umbraAddr);
    const umbraContract = new Contract({ abi, address: umbraAddr, providerOrAccount: provider });
    const balance = await umbraContract.balanceOf(userAddress);
    
    // Handle u256 response (has low/high properties)
    let rawBalance: bigint;
    if (typeof balance === 'object' && balance !== null) {
      if (balance.balance?.low !== undefined) {
        rawBalance = BigInt(balance.balance.low);
      } else if (balance.low !== undefined) {
        rawBalance = BigInt(balance.low);
      } else {
        rawBalance = BigInt(balance.toString());
      }
    } else {
      rawBalance = BigInt(balance || 0);
    }
    
    return formatBigIntToDecimal(rawBalance);
  } catch (err) {
    console.error("Failed to fetch UMBRA balance:", err);
    return "0";
  }
}

export async function getOutstandingRewards(userAddress: string): Promise<string> {
  if (!userAddress) return "0";
  
  const voteAddr = import.meta.env.VITE_VOTE_CONTRACT || "0x1cf58617e3b5844360ec31dcd73ec50a4240f2591f88a250bc457613bcfd678";
  
  try {
    const abi = await loadAbi(voteAddr);
    const voteContract = new Contract({ abi, address: voteAddr, providerOrAccount: provider });
    const rewards = await voteContract.outstanding_rewards(userAddress);
    
    // Handle u256 response (has low/high properties)
    let rawRewards: bigint;
    if (typeof rewards === 'object' && rewards !== null) {
      if (rewards.low !== undefined) {
        rawRewards = BigInt(rewards.low);
      } else {
        rawRewards = BigInt(rewards.toString());
      }
    } else {
      rawRewards = BigInt(rewards || 0);
    }
    
    return formatBigIntToDecimal(rawRewards);
  } catch (err) {
    console.error("Failed to fetch outstanding rewards:", err);
    return "0";
  }
}
