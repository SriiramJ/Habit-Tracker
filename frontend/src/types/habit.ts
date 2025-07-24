export interface Habit {
    _id: string
    userId: string
    title:string
    description?: string
    categoryIds?: string[]
    difficulty?: string
    status?: string
    startDate?: string
    reminderTime?: string
    completed?: boolean
    completedAt?: string
    createdAt?: string
    updatedAt?:string
}