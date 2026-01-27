import { RpcProvider, Contract, constants, hash, events, CallData, num, createAbiParser, Abi, EmittedEvent, ParsedStruct } from 'starknet';
import { getNodeUrl } from "./utils/network";
import { loadAbi } from './utils/fetchEvents';

const provider = new RpcProvider({ nodeUrl: getNodeUrl() })

export async function getApr() {
    const voteAddr = import.meta.env.VITE_VOTE_CONTRACT || "0x1cf58617e3b5844360ec31dcd73ec50a4240f2591f88a250bc457613bcfd678";

    let abi = await loadAbi(voteAddr)

    let voteContract = new Contract({abi: abi, address: voteAddr, providerOrAccount: provider})
    let emissionRate = await voteContract.emission_rate()
    let cumulativeStake = await voteContract.cumulative_stake()

    if(cumulativeStake == 0n) {
        return "1000"
    } else {
        (((emissionRate * 31536000n) / cumulativeStake) * 100n).toString()
    }
}
