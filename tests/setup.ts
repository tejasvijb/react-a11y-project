import { afterEach, expect } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { toHaveNoViolations } from "jest-axe";

// Extend expect with jest-axe matchers
expect.extend(toHaveNoViolations);

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
});
