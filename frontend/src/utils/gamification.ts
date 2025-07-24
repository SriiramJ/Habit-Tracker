// Types for gamification
export type Achievement = {
    id: string;
    name: string;
    description:string;
    icon?:string;
    achieved:boolean;
    dateAchieved: string
}

export type Reward = {
    id: string
    name: string
    description: string
    points: number
    claimed: boolean
    dateClaimed?: string
}

// Example: List of achievements (could be fetched from backend)
{
    id: "streak_7"
    name: "7-Day Streak"
    description:"Congrats! On achieving a 7-Day streak"
    icon:"🔥"
    achieved: false
}
{
    id: "first_habit"
    name:"First Habit"
    description:"Created your first habit."
    icon:"🌱"
    achieved: false
}
{
    id: "first_goal"
    name:"First Goal"
    description:"Created your first goal."
    icon:"🎯"
    achieved: false
}

// Check if a user qualifies for an achievement
export function checkAchievements({
    streak,
    habitsCreated,
    goalsCreated,
}:{
    streak: number
    habitsCreated: number
    goalsCreated:number
}):string[]{
    const unlocked: string[]=[]
    if(streak >=7) unlocked.push("streak_7")
    if(habitsCreated >=1) unlocked.push("first_habit")
    if(goalsCreated >=1) unlocked.push("first_goal")
    return unlocked
}

// Example : List of rewards (could be fetched from backend)
export const REWARDS: Reward[]  = [
    {
        id: "reward_100",
        name: "100 Points Reward",
        description: "Earned 100 points.",
        points:100,
        claimed: false
    }
    // Add more as needed
]

// Claim a reward
export function claimReward(
  rewards: Reward[],
  rewardId: string
): Reward[] {
  return rewards.map((reward) =>
    reward.id === rewardId
      ? { ...reward, claimed: true, dateClaimed: new Date().toISOString() }
      : reward
  );
}
// Get badges based on achievements
export function getBadges(achievements: Achievement[]):string[]{
    return achievements
    .filter((a)=> a.achieved)
    .map((a)=> a.icon || "🏅")
}