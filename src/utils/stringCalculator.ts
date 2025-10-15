export const checkInput = (input: string): boolean => {
    // Check if input is empty or just whitespace
    if (!input || !input.trim()) {
        return false;
    }

    const parts = input.split(",");

    // Use every() to check all parts meet our criteria
    return parts.every((part) => {
        const trimmedPart = part.trim();

        // Check for all conditions in one statement
        const num = parseInt(trimmedPart, 10);
        const isValid =
            trimmedPart !== "" && // Not empty
            /^\d+$/.test(trimmedPart) && // Valid positive integer format
            num >= 0; // Greater than or equal to zero

        return isValid;
    });
};

// Helper to add two numeric strings
export function addTwoStrings(a: string, b: string): string {
    return Number(a) + Number(b) + "";
}
