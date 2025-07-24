import api from "./api"

// Send a push notification via backend
export async function sendPushNotification({
    token,
    title,
    body,
}:{
    token: string
    title: string
    body: string
}) {
    try{
        const res = await api.post("/notification/push",{token,title,body })
        return res.data
    }catch(error:any){
        throw new Error(
            error.response?.data?.message || "Failed to send push notification"
        )
    }
}

// Send an email notification via backend
export async function sendEmailNotification({
    to,
    subject,
    text,
    html
}:{
    to: string
    subject: string
    text?: string
    html?: string
}){
    try {
        const res = await api.post("/notification/email",{to,subject,text,html})
        return res.data
    } catch (error:any) {
        throw new Error(
            error.response?.data?.message ||
            "Failes to send email notification"
        )
    }
}