import { RpcProvider, Contract } from 'starknet';
import { getNodeUrl } from "./utils/network";
import { loadAbi } from './utils/fetchEvents';

const provider = new RpcProvider({ nodeUrl: getNodeUrl() });

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
    
    const amount = Number(rawAmount) / 1e18;
    return amount.toFixed(2);
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
    
    const amount = Number(rawBalance) / 1e18;
    return amount.toFixed(2);
  } catch (err) {
    console.error("Failed to fetch UMBRA balance:", err);
    return "0";
  }
}
