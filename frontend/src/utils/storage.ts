import {toast} from "sonner"
// Save data to localStorage
export function setLocal<T>(key: string,value: T): void{
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch(localStorageError){
       console.error('Failed to store in local storage:', localStorageError);
       toast.error('Failed to store data. Please try again later.');
    }
}

// Get data from localStorage
export function getLocal<T>(key:string):T | null{
    try{
        const item = localStorage.getItem(key)
        return item ? (JSON.parse(item) as T) : null
    }catch{
        return null
    }
}

// Remove data from localStorage
export function removeLocal(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
        console.error('Failed to delete in local storage:');
        toast.error('Failed to delete data. Please try again later.');
  }
}

// Get data from sessionStorage
export function getSession<T>(key:string):T | null{
    try {
        const item = sessionStorage.getItem(key)
        return item ? (JSON.parse(item)as T) : null
    } catch {
        return null
    }
}

// Remove data from sessionStorage
export function removeSession(key:string):void{
    try{
        sessionStorage.removeItem(key)
    }catch{
        console.error('Failed to remove in session storage:');
        toast.error('Failed to session storage. Please try again later.');
    }
}