import { useRewards } from "@/hooks/useRewards";
import { Card } from "../ui/Card";
import { GiftIcon } from "lucide-react";


export default function RewardList(){
    const {rewards, loading, claimReward} = useRewards()

    return(
        <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <GiftIcon className="text-yellow-500 w-5 h-5"/> Rewards
            </h3>
            <Card>
                {loading ? (
                    <div>Loading rewards...</div>
                ): rewards.length === 0 ? (
                    <div className="text-gray-500">No rewards yet.</div>
                ):(
                    <ul className="space-y-2">
                        {rewards.map((reward)=>(
                            <li key={reward.id} className="flex items-center justify-between">
                                <span>
                                    <span className="font-semibold">{reward.name}</span>
                                    <span className="text-xs text-gray-500">{reward.description}</span>
                                </span>
                                {reward.claimed?(
                                    <span className="reward-badge">Claimed</span>
                                ):(
                                    <button
                                    className="bg-yellow-400 tex-white px-2 py-1 rounded text-xs hover:bg-amber-500" onClick={()=> claimReward(reward.id)}
                                    >Claim</button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </Card>
        </section>
    )
}