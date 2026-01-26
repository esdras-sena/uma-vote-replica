import { RpcProvider, Contract, constants, hash, events, CallData, num, createAbiParser, Abi, EmittedEvent, ParsedStruct } from 'starknet';
import { getNodeUrl } from "./utils/network";
import { loadAbi } from './utils/fetchEvents';

const provider = new RpcProvider({ nodeUrl: getNodeUrl() })

export async function getApr() {
    const voteAddr = import.meta.env.VITE_VOTE_CONTRACT || "0x6975fc84224e0f89bc049ac24e0849cb099379487cf3e3d8c38ddafe62eb8e8";

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
