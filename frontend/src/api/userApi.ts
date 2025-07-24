import api from "@/utils/api"
import {User} from "@/types/user"

// Fetch current user profile
export async function fetchCurrentUser():Promise<User>{
    const res = await api.get("/user/profile")
    return res.data
}

// Update user profile
export async function updateUserProfile(data: Partial<User>): Promise<User>{
    const res = await api.put("/user/profile",data)
    return res.data
}

// Fetch user preferences
export async function fetchUserPreferences(): Promise<any>{
    const res = await api.get("/user/preferences")
    return res.data
}

// Update user preferences
export async function updateUserPreferences(data:any): Promise<any> {
    const res = await api.put("/user/preferences",data)
    return res.data
}