// Type for a goal
export interface Goal{
    _id: string
    userId: string
    title: string
    description?: string
    categoryIds?: string[]
    targetDate?: string
    isCompleted?: boolean
    createdAt?: string
    updatedAt?: string
}

// Format goal title (Capitalize first letter)
export function formatGoalTitle(title: string): string{
    if (!title) return ""
    return title.charAt(0).toUpperCase() + title.slice(1)
}

// Check if a goal is overdue
export function isGoalOverdue(goal: Goal): boolean{
    if(!goal.targetDate || goal.isCompleted) return false
    const today = new Date()
    const target = new Date(goal.targetDate)
    today.setHours(0,0,0,0)
    target.setHours(0,0,0,0)
    return target < today
}

// Calculate days left untils goal's target date
export function daysUntilGoal(goal: Goal): number| null{
    if(!goal.targetDate) return null
    const today = new Date();
    const target = new Date(goal.targetDate);
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 *24))
}

// Filter completed goals
export function filterCompletedGoals(goals: Goal[]): Goal[]{
    return goals.filter((g)=> g.isCompleted)
}

// Filter active (not completed goals) goals
export function filterActiveGoals(goals: Goal[]): Goal[]{
    return goals.filter((g)=> !g.isCompleted)
}

// Group goals by category
export function groupGoalsByCategory(goals: Goal[], categoryIds: string[]): Record<string, Goal[]>{
    const grouped: Record<string, Goal[]> = {}
    categoryIds.forEach((catId)=>{
        grouped[catId] = goals.filter((goal)=> goal.categoryIds?.includes(catId))
    })
    return grouped
}