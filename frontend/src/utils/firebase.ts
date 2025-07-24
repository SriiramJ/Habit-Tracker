import {initializeApp} from "firebase/app";
import {getMessaging,getToken, onMessage,Messaging} from "firebase/messaging"

// Firebase config
const firebaseConfig = {
     apiKey:process.env.API_KEY ,
     authDomain:process.env.AUTH_DOMAIN ,
     projectId:process.env.PROJECT_ID ,
     messagingSenderId:process.env.MESSAGING_SENDER_ID ,
     appId:process.env.APP_ID ,
}

// Initialize Firebase app and messaging
const firebaseApp = initializeApp(firebaseConfig)
let messaging : Messaging | null = null
try{
    messaging = getMessaging(firebaseApp)
}catch{
    messaging = null
}

// Request permission and get FCM token
export async function requestNotificationPermissionAndToken(vapidKey?:string):Promise<string|null>{
    if(!messaging) return null
    try{
        const permission = await Notification.requestPermission()
        if(permission !== "granted") return null
        const token = await getToken(messaging,vapidKey?{vapidKey}:undefined)
        return token
    }catch{
        return null
    }
}

// Listen for foreground messages
export function onFirebaseMessage(callback: (payload:any)=> void): void{
    if(!messaging) return 
    onMessage(messaging,callback)
}

// Export messaging instance if needed elsewhere
export { messaging };