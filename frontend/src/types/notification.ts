export interface Notification{
    _id: string
    userId: string
    message: string
    type?: string
    priority?: string
    actionRequired?: boolean
    sentAt?: string
    read?: boolean
}