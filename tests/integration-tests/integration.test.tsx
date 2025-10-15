import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import App from "../../src/App";
import * as stringCalculator from "../../src/utils/stringCalculator";

describe("App Integration Tests", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("calculates the sum of numbers correctly and displays the result", async () => {
    render(<App />);
    const user = userEvent.setup();

    // Get the textarea and button
    const textarea = screen.getByTestId("number-input");
    const button = screen.getByText(/calculate/i);

    // Enter valid numbers
    await user.click(textarea);
    await user.keyboard("1,2,3");

    // Click the calculate button
    await user.click(button);

    // Check the result
    await waitFor(() => {
      expect(screen.getByText("Result: 6")).toBeInTheDocument();
    });
  });

  it("shows error message when invalid input is provided", async () => {
    render(<App />);
    const user = userEvent.setup();

    // Get the textarea and button
    const textarea = screen.getByTestId("number-input");
    const button = screen.getByText(/calculate/i);

    // Enter invalid input (letters)
    await user.click(textarea);
    await user.keyboard("1,a,3");

    // Click the calculate button
    await user.click(button);

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/make sure you enter numbers correctly/i)).toBeInTheDocument();
    });
  });

  it("handles empty input correctly", async () => {
    render(<App />);
    const user = userEvent.setup();

    // Get the button
    const button = screen.getByText(/calculate/i);

    // Leave the textarea empty
    await user.click(button);

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/make sure you enter numbers correctly/i)).toBeInTheDocument();
    });
  });

  it("handles form submission via Enter key", async () => {
    render(<App />);
    const user = userEvent.setup();

    // Get the textarea
    const textarea = screen.getByTestId("number-input");

    // Enter valid numbers
    await user.click(textarea);
    await user.keyboard("5,10");

    // Press Enter to submit
    await user.keyboard("{Enter}");

    // Check the result
    await waitFor(() => {
      expect(screen.getByText("Result: 15")).toBeInTheDocument();
    });
  });

  it("correctly calculates large numbers without JavaScript precision issues", async () => {
    render(<App />);
    const user = userEvent.setup();

    // Get the textarea and button
    const textarea = screen.getByTestId("number-input");
    const button = screen.getByText(/calculate/i);

    // Enter large numbers that would cause precision issues in normal JS addition
    await user.click(textarea);
    await user.keyboard("999999999999,1");

    // Click the calculate button
    await user.click(button);

    // Check the result - should be correct string addition
    await waitFor(() => {
      expect(screen.getByText("Result: 1000000000000")).toBeInTheDocument();
    });
  });

  it("integrates with the stringCalculator utility functions", async () => {
    // Spy on the utility functions
    const checkInputSpy = vi.spyOn(stringCalculator, "checkInput");
    const sumStringNumbersSpy = vi.spyOn(stringCalculator, "sumStringNumbers");

    render(<App />);
    const user = userEvent.setup();

    // Get the textarea and button
    const textarea = screen.getByTestId("number-input");
    const button = screen.getByText(/calculate/i);

    // Enter valid numbers
    await user.click(textarea);
    await user.keyboard("7,8");

    // Click the calculate button
    await user.click(button);

    // Verify both utility functions were called with the right parameters
    expect(checkInputSpy).toHaveBeenCalledWith("7,8");
    expect(sumStringNumbersSpy).toHaveBeenCalledWith("7,8");

    // Check the result
    await waitFor(() => {
      expect(screen.getByText("Result: 15")).toBeInTheDocument();
    });
  });

  it("clears error message when valid input is entered after an error", async () => {
    render(<App />);
    const user = userEvent.setup();

    // Get the textarea and button
    const textarea = screen.getByTestId("number-input");
    const button = screen.getByText(/calculate/i);

    // First enter invalid input
    await user.click(textarea);
    await user.keyboard("1,x");
    await user.click(button);

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/make sure you enter numbers correctly/i)).toBeInTheDocument();
    });

    // Clear input and enter valid numbers
    await user.clear(textarea);
    await user.keyboard("1,2");
    await user.click(button);

    // Error message should be gone and result should appear
    await waitFor(() => {
      expect(screen.queryByText(/make sure you enter numbers correctly/i)).not.toBeInTheDocument();
      expect(screen.getByText("Result: 3")).toBeInTheDocument();
    });
  });

  it("handles edge case with leading zeros correctly", async () => {
    render(<App />);
    const user = userEvent.setup();

    // Get the textarea and button
    const textarea = screen.getByTestId("number-input");
    const button = screen.getByText(/calculate/i);

    // Enter numbers with leading zeros (which should be invalid according to checkInput)
    await user.click(textarea);
    await user.keyboard("01,2");

    // Click the calculate button
    await user.click(button);

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/make sure you enter numbers correctly/i)).toBeInTheDocument();
    });

    // Try with valid input (no leading zeros)
    await user.clear(textarea);
    await user.keyboard("1,02");

    // Click the calculate button
    await user.click(button);

    // Check for error message again (02 has leading zero)
    await waitFor(() => {
      expect(screen.getByText(/make sure you enter numbers correctly/i)).toBeInTheDocument();
    });
  });

  it("handles valid input with spaces correctly", async () => {
    render(<App />);
    const user = userEvent.setup();

    // Get the textarea and button
    const textarea = screen.getByTestId("number-input");
    const button = screen.getByText(/calculate/i);

    // Enter numbers with spaces
    await user.click(textarea);
    await user.keyboard("1, 2, 3");

    // Click the calculate button
    await user.click(button);

    // Check the result - spaces should be trimmed and calculation should work
    await waitFor(() => {
      expect(screen.getByText("Result: 6")).toBeInTheDocument();
    });
  });
});
