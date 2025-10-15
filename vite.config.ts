import { defineConfig, coverageConfigDefaults } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        setupFiles: "./tests/setup.ts",
        globals: true,
        coverage: {
            ...coverageConfigDefaults,
        },
    },
});
