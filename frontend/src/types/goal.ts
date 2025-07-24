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
