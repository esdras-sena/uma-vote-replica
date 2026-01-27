import { RpcProvider, Contract, hash, num } from 'starknet';
import { getNodeUrl } from "./utils/network";
import { getBlockNumberByTimestamp } from './utils/fetchEvents';
import voteAbi from './abis/vote.json';

function getProvider() {
  return new RpcProvider({ nodeUrl: getNodeUrl() });
}

export async function getCurrentRoundId(): Promise<number> {
  const provider = getProvider();
  const voteAddr = import.meta.env.VITE_VOTE_CONTRACT || "0x6975fc84224e0f89bc049ac24e0849cb099379487cf3e3d8c38ddafe62eb8e8";
  
  try {
    const voteContract = new Contract({ abi: voteAbi, address: voteAddr, providerOrAccount: provider });
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
    
    // Get block numbers
    const fromBlock = await getBlockNumberByTimestamp(hoursAgo48);
    const latestBlock = await provider.getBlockNumber();
    
    // VoteCommitted struct keys: voter, caller, roundId (u256), identifier
    // u256 in Cairo is always serialized as 2 felts: low (128 bits) + high (128 bits)
    // Filter: [eventSelector, voter, caller, roundIdLow, roundIdHigh, identifier]
    
    const eventSelector = num.toHex(hash.starknetKeccak('VoteCommitted'));
    const voterKey = num.toHex(userAddress);
    const roundIdLow = num.toHex(currentRoundId);
    const roundIdHigh = num.toHex(0); // High part is 0 for small roundIds
    
    const keyFilter = [
      [eventSelector],    // Event selector (position 0)
      [voterKey],         // voter address (position 1)
      [],                 // caller - any (position 2)
      [roundIdLow],       // roundId low part (position 3)
      [roundIdHigh],      // roundId high part (position 4)
      [],                 // identifier - any (position 5)
    ];
    
    let allEvents: any[] = [];
    let continuationToken: string | undefined = '0';
    
    while (continuationToken) {
      const eventsRes = await provider.getEvents({
        address: voteAddr,
        from_block: { block_number: fromBlock },
        to_block: { block_number: latestBlock },
        keys: keyFilter,
        chunk_size: 1000,
        continuation_token: continuationToken === '0' ? undefined : continuationToken,
      });
      
      allEvents = allEvents.concat(eventsRes.events);
      continuationToken = eventsRes.continuation_token;
    }
    
    return allEvents.length;
  } catch (err) {
    console.error("Failed to fetch vote count:", err);
    return 0;
  }
}
