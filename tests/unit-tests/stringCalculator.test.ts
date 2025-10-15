import { describe, it, expect } from "vitest";
import {
    checkInput,
    addTwoStrings,
    sumStringNumbers,
} from "../../src/utils/stringCalculator";

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
        "001,002,03",
        "00300",
        "00,01,02",
        "0.0,1.1",
        "  ,  ",
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
        expect(addTwoStrings("0", "0")).toBe("0");
        expect(addTwoStrings("0", "5")).toBe("5");
        expect(addTwoStrings("7", "0")).toBe("7");
        expect(addTwoStrings("4", "6")).toBe("10");
        expect(addTwoStrings("9", "1")).toBe("10");
        expect(addTwoStrings("1", "9")).toBe("10");
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

describe("sumStringNumbers function", () => {
    it("handles single number input", () => {
        expect(sumStringNumbers("5")).toBe("5");
        expect(sumStringNumbers("0")).toBe("0");
        expect(sumStringNumbers("123")).toBe("123");
        expect(sumStringNumbers("999999")).toBe("999999");
    });

    it("sums multiple numbers", () => {
        expect(sumStringNumbers("1,2,3")).toBe("6");
        expect(sumStringNumbers("10,20,30")).toBe("60");
        expect(sumStringNumbers("5,10,15,20")).toBe("50");
        expect(sumStringNumbers("1,2,3,4,5,6,7,8,9")).toBe("45");
    });

    it("handles whitespace in input", () => {
        expect(sumStringNumbers("1, 2, 3")).toBe("6");
        expect(sumStringNumbers(" 5 , 10 , 15 ")).toBe("30");
        expect(sumStringNumbers("100, 200, 300")).toBe("600");
    });

    it("correctly sums large numbers", () => {
        expect(sumStringNumbers("999,1")).toBe("1000");
        expect(sumStringNumbers("1000,9000")).toBe("10000");
        expect(sumStringNumbers("9999999999,1")).toBe("10000000000");
    });

    it("handles inputs with zeros", () => {
        expect(sumStringNumbers("0,0,0")).toBe("0");
        expect(sumStringNumbers("0,1,0,2,0")).toBe("3");
        expect(sumStringNumbers("10,0,20")).toBe("30");
    });

    it("correctly processes mixed-size numbers", () => {
        expect(sumStringNumbers("1,22,333,4444")).toBe("4800");
        expect(sumStringNumbers("9,99,999,9999")).toBe("11106");
    });

    it("handles extremely large numbers", () => {
        expect(sumStringNumbers("9999999999999999999999999999999,1")).toBe(
            "10000000000000000000000000000000"
        );
        expect(sumStringNumbers("1234567890,9876543210")).toBe("11111111100");
        expect(
            sumStringNumbers(
                "99999999999999999999,88888888888888888888, 99999999998899999"
            )
        ).toBe("188888888888888888887");
    });

    it("throws error for invalid input", () => {
        expect(() => sumStringNumbers("")).toThrow("Invalid input");
        expect(() => sumStringNumbers("1,a,3")).toThrow("Invalid input");
        expect(() => sumStringNumbers("1,-2,3")).toThrow("Invalid input");
        expect(() => sumStringNumbers("1,2.5")).toThrow("Invalid input");
        expect(() => sumStringNumbers("1,2,")).toThrow("Invalid input");
        expect(() => sumStringNumbers(",1,2")).toThrow("Invalid input");
        expect(() => sumStringNumbers("001,2")).toThrow("Invalid input");
    });
});
