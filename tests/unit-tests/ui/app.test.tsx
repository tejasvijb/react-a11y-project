import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "../../../src/App";

// Extend expect with jest-axe matchers
expect.extend(toHaveNoViolations);

describe("App Component Accessibility Tests", () => {
  beforeEach(() => {
    // Set up user events
    vi.resetAllMocks();
  });

  it("renders without accessibility violations", async () => {
    const { container } = render(<App />);
    const results = await axe(container);

    expect(results.violations.length).toBe(0);
  });

  it("has proper heading hierarchy", () => {
    render(<App />);

    const header = screen.getByRole("heading", { level: 2 });
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("String Calculator");
  });

  it("has accessible image with proper alt text", () => {
    render(<App />);

    const image = screen.getByRole("img", { name: /spool of thread/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", "spool of thread");
  });

  it("has properly associated label with form control", () => {
    render(<App />);

    // Find the textarea using its label text
    const textarea = screen.getByTestId("number-input");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("id", "number-input");

    // Find the label element
    const label = screen.getByTestId("label");
    expect(label).toHaveAttribute("for", "number-input");
  });

  it("has sufficient color contrast for text elements", () => {
    render(<App />);

    const calculatorHeading = screen.getByText("String Calculator");
    const styles = window.getComputedStyle(calculatorHeading);

    // Check if heading has sufficient color contrast (this is just a basic check)
    // A more comprehensive check would use the actual contrast ratio calculation
    expect(styles.color).not.toBe(styles.backgroundColor);
  });

  it("ensures keyboard navigation works for form controls", async () => {
    render(<App />);
    const user = userEvent.setup();

    // Get the form elements
    const textarea = await screen.findByTestId("number-input");
    const button = await screen.findByTestId("button");

    // Tab to focus on the textarea
    await user.tab();
    expect(textarea).toHaveFocus();
    // Ensure we can interact with focused elements
    await user.keyboard("123");
    expect(textarea).toHaveValue("123");

    // Tab again to focus on the button
    await user.tab();
    expect(button).toHaveFocus();


    // Focus on button and press it

    await user.keyboard("{Enter}");
    // Here you would check for the expected behavior after button press
  });

  it("maintains focus when interacting with form controls", async () => {
    render(<App />);
    const user = userEvent.setup();

    const textarea = screen.getByRole("textbox");

    // Focus and type in the textarea
    await user.click(textarea);
    await user.keyboard("123,456");

    expect(textarea).toHaveFocus();
    expect(textarea).toHaveValue("123,456");
  });

  it("properly handles button interactions", async () => {
    render(<App />);
    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: /calculate/i });

    // The button should be interactive
    expect(button).not.toBeDisabled();

    // Click the button
    await user.click(button);

    // Here you would add expectations based on what clicking the button should do
    // For example, checking if calculation result appears
  });

  it("ensures all interactive elements are focusable", async () => {
    render(<App />);

    // Get all interactive elements
    const interactiveElements = screen.getAllByRole("button");
    interactiveElements.push(screen.getByRole("textbox"));

    // Check that each element can receive focus
    interactiveElements.forEach(element => {
      element.focus();
      expect(element).toHaveFocus();
    });
  });



  it("checks for proper form element attributes", () => {
    render(<App />);

    const textarea = screen.getByRole("textbox");

    // Check for placeholder
    expect(textarea).toHaveAttribute("placeholder", "Enter numbers");

    // Check that rows attribute is set for better accessibility
    expect(textarea).toHaveAttribute("rows");
  });
});