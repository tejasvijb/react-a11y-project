export const checkInput = (input: string): boolean => {
    if (!input || !input.trim()) {
        return false;
    }

    const parts = input.split(",");

    for (const part of parts) {
        const trimmedPart = part.trim();

        // Check if part is empty (happens with consecutive commas)
        if (trimmedPart === "") {
            return false;
        }

        // Check if part is a valid positive integer
        if (!/^\d+$/.test(trimmedPart)) {
            return false;
        }

        // Check if number is negative or zero
        const num = parseInt(trimmedPart, 10);
        if (num <= 0) {
            return false;
        }

        // Check if number is greater than 9999999999
        if (num > 9999999999) {
            return false;
        }
    }

    return true;
};
