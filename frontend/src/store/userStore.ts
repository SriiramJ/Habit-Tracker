import {create} from "zustand"
import { User } from "@/types/user"
import {
    fetchCurrentUser,
    updateUserProfile,
    fetchUserPreferences,
    updateUserPreferences
} from "@/api/userApi"

interface UserState{
    user : User | null
    preferences : any
    loading: boolean
    fetchUser: () => Promise<void>
    updateProfile: (data: Partial<User>) => Promise<void>
    fetchPreferences: () => Promise<void>
    updatePreferences: (data: any) => Promise<void>
}

export const useUserStore = create<UserState>((set)=>({
    user: null,
    preferences: null,
    loading: false,
    fetchUser: async()=>{
        set({loading: true})
        try {
            const user = await fetchCurrentUser()
            set({user})
        }finally {
            set({loading: false})
        }
    },

    updateProfile: async(data)=>{
        set({loading: true})
        try{
            const user = await updateUserProfile(data)
            set({user})
        }finally{
            set({loading: false})
        }
    },

    fetchPreferences: async()=>{
        set({loading: true})
        try{
            const preferences = await fetchUserPreferences()
            set({preferences})
        }finally{
            set({loading: false})
        }
    },
    updatePreferences: async(data)=>{
        set({loading: true})
        try{
            const preferences = await updateUserPreferences(data)
            set({preferences})
        }finally{
            set({loading: true})
        }
    }
}))