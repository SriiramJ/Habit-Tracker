import LogRocket from "logrocket";

export function initLogRocket(){
    if(typeof window !== "undefined" && process.env.NEXT_PUBLIC_LOGROCKET_ID){
        LogRocket.init(process.env.NEXT_PUBLIC_LOGROCKET_ID)
    }
}