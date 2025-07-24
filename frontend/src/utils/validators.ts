// Validate email format
export function isValidEmail(email: string): boolean{
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email)
}

// Validate password(min 8 chars, at least 1 letter and 1 number)
export function isValidPassword(password: string): boolean{
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}

// Validate required string fields
export function isRequired(value:string):boolean{
    return value.trim().length > 0
}

// Validate username(alphanumeric, 3-20 chars)
export function isValidUsername(username:string): boolean{
    return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}

// Validate habit/goal name(non-empty, max 50 chars)
export function isValidName(name: string):boolean{
    return typeof name === "string" && name.trim().length > 0 && name.length <= 50
}