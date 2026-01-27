import { RpcProvider, Contract, hash, num } from 'starknet';
import { getNodeUrl } from "./utils/network";
import { fetchEvents, getBlockNumberByTimestamp } from './utils/fetchEvents';
import voteAbi from './abis/vote.json';

function getProvider() {
  return new RpcProvider({ nodeUrl: getNodeUrl() });
}

export async function getCurrentRoundId(): Promise<number> {
  const provider = getProvider();
  const voteAddr = import.meta.env.VITE_VOTE_CONTRACT || "0x1cf58617e3b5844360ec31dcd73ec50a4240f2591f88a250bc457613bcfd678";

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
  const voteAddr = import.meta.env.VITE_VOTE_CONTRACT || "0x1cf58617e3b5844360ec31dcd73ec50a4240f2591f88a250bc457613bcfd678";

  try {
    const currentRoundId = await getCurrentRoundId();
    if (currentRoundId === 0) return 0;

    const now = Math.floor(Date.now() / 1000);
    const hoursAgo48 = now - (48 * 60 * 60);

    const fromBlock = await getBlockNumberByTimestamp(hoursAgo48);
    const latestBlock = await provider.getBlockNumber();

    const eventSelector = num.toHex(hash.starknetKeccak('VoteCommitted'));
    const voterKey = num.toHex(userAddress);
    const roundIdLow = num.toHex(currentRoundId);
    const roundIdHigh = num.toHex(0);

    // keys filter must be arrays of hex strings (no nulls)
    // VoteCommitted keys layout: [eventSelector, voter, <wildcards...>, roundId.low, roundId.high, ...]
    const keyFilter = [[eventSelector], [voterKey], [], [roundIdLow], [roundIdHigh], []];

    const [events] = await fetchEvents(fromBlock, latestBlock, voteAddr, keyFilter, 'VoteCommitted');
    return events.length;
  } catch (err) {
    console.error("Failed to fetch vote count:", err);
    return 0;
  }
}
