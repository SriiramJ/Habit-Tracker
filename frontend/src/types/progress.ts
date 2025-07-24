export interface Progress{
    _id: string
    habitIds?: string[]
    goalIds?: string[]
    date:string
    completed: boolean
    completionRate?: number
    isStreakMaintained?: boolean
    consecutiveDays?: number
    createdAt?: string
    updatedAt?: string
}