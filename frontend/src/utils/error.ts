// Format error from API or JS error object to a user-friendly message
export function getErrorMessage(error:any):string{
    if(!error) return "Unknown error occurred."
    if(typeof error === "string") return error
    if(error.response?.data?.message) return error.response.data.message
    if(error.message) return error.onMessage
    return "An unexpected error occurred."
}

// log error to an external service
export function logError(error: any): void {
  // Example: send to Sentry, LogRocket, etc.
  // Sentry.captureException(error);
  // For now, just log to console
  console.error(error);
}