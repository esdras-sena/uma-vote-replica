import { RpcProvider, Contract, hash, num } from 'starknet';
import { getNodeUrl } from "./utils/network";
import { loadAbi, getBlockNumberByTimestamp } from './utils/fetchEvents';

function getProvider() {
  return new RpcProvider({ nodeUrl: getNodeUrl() });
}

export async function getCurrentRoundId(): Promise<number> {
  const provider = getProvider();
  const voteAddr = import.meta.env.VITE_VOTE_CONTRACT || "0x6975fc84224e0f89bc049ac24e0849cb099379487cf3e3d8c38ddafe62eb8e8";
  
  try {
    const abi = await loadAbi(voteAddr);
    const voteContract = new Contract({ abi, address: voteAddr, providerOrAccount: provider });
    const roundId = await voteContract.get_current_round_id();
    return Number(roundId);
  } catch (err) {
    console.error("Failed to fetch current round ID:", err);
    return 0;
  }
}

export async function getVoteCount(userAddress: string): Promise<number> {
  if (!userAddress) return 0;
  
  const provider = getProvider();
  const voteAddr = import.meta.env.VITE_VOTE_CONTRACT || "0x6975fc84224e0f89bc049ac24e0849cb099379487cf3e3d8c38ddafe62eb8e8";
  
  try {
    // Get current round ID
    const currentRoundId = await getCurrentRoundId();
    if (currentRoundId === 0) return 0;
    
    // Calculate timestamp for 48 hours ago
    const now = Math.floor(Date.now() / 1000);
    const hoursAgo48 = now - (48 * 60 * 60);
    
    // Get block number for 48 hours ago
    const fromBlock = await getBlockNumberByTimestamp(hoursAgo48);
    const latestBlock = await provider.getBlockNumber();
    
    // Build event filter for VoteCommitted
    // Keys: [event_selector, voter, caller, roundId_low, roundId_high, identifier]
    const eventSelector = num.toHex(hash.starknetKeccak('VoteCommitted'));
    const voterKey = num.toHex(userAddress);
    
    // Fetch events with voter filter
    let allEvents: any[] = [];
    let continuationToken: string | undefined = undefined;
    
    do {
      const eventsList = await provider.getEvents({
        address: voteAddr,
        from_block: { block_number: fromBlock },
        to_block: { block_number: latestBlock },
        keys: [[eventSelector], [voterKey]],
        chunk_size: 1000,
        continuation_token: continuationToken,
      });
      
      continuationToken = eventsList.continuation_token;
      allEvents = allEvents.concat(eventsList.events);
    } while (continuationToken !== undefined);
    
    // Filter events by current round ID
    // The roundId is a u256, so it's split into low and high parts in the keys
    // keys[3] = roundId_low, keys[4] = roundId_high
    const filteredEvents = allEvents.filter(event => {
      if (event.keys.length >= 5) {
        const roundIdLow = BigInt(event.keys[3]);
        const roundIdHigh = BigInt(event.keys[4]);
        const eventRoundId = roundIdLow + (roundIdHigh << 128n);
        return eventRoundId === BigInt(currentRoundId);
      }
      return false;
    });
    
    return filteredEvents.length;
  } catch (err) {
    console.error("Failed to fetch vote count:", err);
    return 0;
  }
}
