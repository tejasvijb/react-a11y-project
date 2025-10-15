import { describe, it, expect } from "vitest";
import { checkInput } from "../src/utils/stringCalculator";

describe("checkInput", () => {
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
        "10000000000", // number greater than 9999999999
        "1,10000000000,3",
        "9999999999,10000000000",
        "abc",
        "123abc, 456, adsf",
        "asdf",
        "1, 2, three",
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
