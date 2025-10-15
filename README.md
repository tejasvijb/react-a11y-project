# Incubyte String Calculator Template

## Overview

This project contains a **String Calculator template** built using React. The primary goal is for candidates to implement the functionality and improve accessibility in the provided UI component.

## Features

-   **String-Based Calculator**: Add multiple positive integers provided as comma-separated strings
-   **Accessibility Support**: Fully accessible user interface with ARIA attributes and semantic HTML
-   **Screen Reader test**: Tested with screen reader: JAWS
-   **Large Number Support**: Handles extremely large integers beyond JavaScript's native number limitations
-   **Input Validation**: Validates user input with clear error messaging
-   **Responsive Design**: Clean and intuitive UI that works across different screen sizes
-   **Test**: Achieved 96.32% code coverage. Implemented unit and integration tests

## Project Structure

-   **src/**
    -   `App.tsx`: The React component with accessibility issues.
    -   `App.css`: Styles for the App component.
    -   `main.tsx`: Main entry point for the React application.
    -   **components/**: Directory for React components.
    -   **hooks/**: Directory for custom React hooks.
    -   **utils/**
        -   `stringCalculator.ts`: Implementation of the String Calculator logic (to be developed).
-   **tests/**
    -   `App.test.tsx`: Tests for the App component.
    -   `setup.ts`: Test setup configuration.
    -   **integration-tests/**
        -   `integration.test.tsx`: Integration tests for the application.
    -   **unit-tests/**
        -   `stringCalculator.test.ts`: Unit tests for the String Calculator functionality.
        -   **ui/**
            -   `app.test.tsx`: Unit tests for UI components.

## Getting Started

1. **Clone the Repository**

    ```bash
    git clone https://github.com/tejasvijb/react-a11y-project.git
    cd react-a11y-project
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Run the Application**

    ```bash
    npm run dev
    ```

4. **Run Tests**

    ```bash
    npm run test
    ```

## Task for Candidates

-   Implement the functionality of the String Calculator following TDD best practices.
-   Resolve accessibility issues in the `App.tsx`.
