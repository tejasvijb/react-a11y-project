import { describe, it, expect } from "vitest";
import { checkInput, addTwoStrings } from "../src/utils/stringCalculator";

describe("Check for valid input", () => {
    const validInputs = [
        "1",
        "1,2,3",
        "1, 2,3",
        " 1 ,2",
        "10,20,300",
        "9999999999",
        "1,9999999999",
        "0,1,2",
        "0",
        "99999999999999999999999999999999999",
    ];

    const invalidInputs = [
        "",
        "   ",
        "1,a,3",
        "1,-2,3",
        "1,2.5",
        "1,2,",
        ",1,2",
        "1,,2",
        ",",
        "1:2:3",
        "-0",
        "-233",
        "abc",
        "123abc, 456, adsf",
        "asdf",
        "1, 2, three",
        "1 2 3,  45 6",
        "4 5",
        "123, 45 6",
        "-09999999999999999999999999999999999",
        "-998892849829849284928492849284928492849284928492849",
        "12.34,56",
    ];

    validInputs.forEach((input) => {
        it(`returns true for valid input "${input}"`, () => {
            expect(checkInput(input)).toBe(true);
        });
    });

    invalidInputs.forEach((input) => {
        it(`returns false for invalid input "${input}"`, () => {
            expect(checkInput(input)).toBe(false);
        });
    });
});

describe("addTwoStrings function", () => {
    it("adds two single-digit numbers", () => {
        expect(addTwoStrings("1", "2")).toBe("3");
        expect(addTwoStrings("5", "7")).toBe("12");
        expect(addTwoStrings("9", "9")).toBe("18");
    });

    it("adds two multi-digit numbers of the same length", () => {
        expect(addTwoStrings("12", "34")).toBe("46");
        expect(addTwoStrings("25", "75")).toBe("100");
        expect(addTwoStrings("99", "99")).toBe("198");
        expect(addTwoStrings("123", "456")).toBe("579");
        expect(addTwoStrings("999", "999")).toBe("1998");
    });

    it("adds two numbers of different lengths", () => {
        expect(addTwoStrings("1", "23")).toBe("24");
        expect(addTwoStrings("123", "7")).toBe("130");
        expect(addTwoStrings("9", "999")).toBe("1008");
        expect(addTwoStrings("1234", "56")).toBe("1290");
    });

    it("handles zero correctly", () => {
        expect(addTwoStrings("0", "0")).toBe("0");
        expect(addTwoStrings("0", "123")).toBe("123");
        expect(addTwoStrings("456", "0")).toBe("456");
    });

    it("handles large numbers", () => {
        expect(addTwoStrings("9999999999999999999999999999999", "1")).toBe(
            "10000000000000000000000000000000"
        );
        expect(addTwoStrings("1234567890", "9876543210")).toBe("11111111100");
    });
});
