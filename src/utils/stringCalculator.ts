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
            num >= 0 && // Greater than or equal to zero
            (trimmedPart === "0" || !trimmedPart.startsWith("0")); // No leading zeros except single "0"

        return isValid;
    });
};

// Helper to add two numeric strings
export function addTwoStrings(a: string, b: string): string {
    let i = a.length - 1,
        j = b.length - 1,
        carry = 0,
        res = "";

    while (i >= 0 || j >= 0 || carry) {
        const n1 = i >= 0 ? +a[i] : 0;
        const n2 = j >= 0 ? +b[j] : 0;
        const sum = n1 + n2 + carry;
        res = (sum % 10) + res;
        carry = Math.floor(sum / 10);
        i--;
        j--;
    }

    return res;
}

export function sumStringNumbers(input: string): string {
    if (!checkInput(input)) {
        throw new Error("Invalid input");
    }

    let total = "0";
    let i = 0,
        start = 0;

    while (i <= input.length) {
        // When we hit a comma or end of string, we process one number
        if (i === input.length || input[i] === ",") {
            const num = input.slice(start, i).trim(); // trim spaces
            if (num.length > 0) total = addTwoStrings(total, num);
            start = i + 1;
        }
        i++;
    }

    return total;
}
