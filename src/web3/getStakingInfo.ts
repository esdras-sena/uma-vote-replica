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
  
  const voteAddr = import.meta.env.VITE_VOTE_CONTRACT || "0x6975fc84224e0f89bc049ac24e0849cb099379487cf3e3d8c38ddafe62eb8e8";
  
  try {
    const abi = await loadAbi(voteAddr);
    const voteContract = new Contract({ abi, address: voteAddr, providerOrAccount: provider });
    const stakedAmount = await voteContract.voter_stakes(userAddress);
    
    // Handle u256 response (has low/high properties)
    let rawAmount: bigint;
    if (typeof stakedAmount === 'object' && stakedAmount !== null) {
      if (stakedAmount.low !== undefined) {
        rawAmount = BigInt(stakedAmount.low);
      } else {
        rawAmount = BigInt(stakedAmount.toString());
      }
    } else {
      rawAmount = BigInt(stakedAmount || 0);
    }
    
    return formatBigIntToDecimal(rawAmount);
  } catch (err) {
    console.error("Failed to fetch staked amount:", err);
    return "0";
  }
}

export async function getUmbraBalance(userAddress: string): Promise<string> {
  if (!userAddress) return "0";
  
  const umbraAddr = import.meta.env.VITE_UMBRA || "0x32d3cfeb9740cf36ae54d823ff193676f36fa99310c04ad0bc8df8bc5a2028e";
  
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
