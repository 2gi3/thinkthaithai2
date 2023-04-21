// Matches a valid email address of the form "local-part@domain.com"
export const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Matches a valid name with alphabetical characters, spaces, and common punctuation (such as apostrophes, hyphens, and periods)
// Allows for names with multiple components (e.g. "John Smith" or "Mary Anne O'Brien")
export const nameRegex: RegExp = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*){0,34}$/;

// Matches a password with 8-20 characters, at least one uppercase letter, and at least one special character
// Allows for a wide range of special characters (including common punctuation and symbols)
export const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,20}$/;
