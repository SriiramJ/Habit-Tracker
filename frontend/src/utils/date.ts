// Format a date string (ISO or date) to 'YYYY-MM-DD'
export function formatDate(date: string | Date): string{
    const d = new Date(date)
    return d.toISOString().split("T")[0]
}

// Format a date to a readable string
export function formatReadableDate(date: string | Date):string{
    const d = new Date(date)
    return d.toLocaleDateString(undefined,{
        year: "numeric",
        month: "long",
        day:"numeric",
    })
}

// Calculate the difference in days between two dates
export function daysBetween(date1: string | Date, date2: string | Date):Boolean{
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    return(
        d1.getFullYear === d2.getFullYear &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    )
}