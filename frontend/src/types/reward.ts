export interface Reward{
    id: string
    name: string
    description: string
    points: number
    claimed: boolean
    dateClaimed?: string
}