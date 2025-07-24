// Format a number as a percentage string
export function formatPercentage(value: number, fractionDigits = 0):string{
    return `${(value * 100).toFixed(fractionDigits)}`
}

// Format a number with commas
export function formatNumber(value: number): string{
    return value.toLocaleString()
}

// Format points or scores
export function formatPoints(value: number): string{
    return `${formatNumber(value)} pts`
}

// Format duration in days
export function formatDays(days: number):string{
    return `${days} day${days === 1 ? "": "s"}`
}