// Check if two dates are on the same day
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

// Calculate the difference on days between two dates
export function daysBetween(date1: Date, date2: Date):number{
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    d1.setHours(0,0,0,0)
    d2.setHours(0,0,0,0)
    return Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24))
}

// Update streak count based on last login date
export function getUpdatedStreak(
    lastLoginDate: string | Date | null,
    currentStreak: number
):number{
    const today = new Date()
    today.setHours(0,0,0,0)

    if(!lastLoginDate){
        return 1
    }
    const lastLogin = new Date(lastLoginDate)
    lastLogin.setHours(0,0,0,0)

    const diffDays = daysBetween(lastLogin, today)

    if(diffDays === 1){
        return currentStreak + 1
    }else if (diffDays > 1){
        return 1
    }else{
        diffDays === 0
        return currentStreak
    }
}
export const STREAK_ICON = "🔥";