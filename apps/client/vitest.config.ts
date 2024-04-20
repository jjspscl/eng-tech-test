import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',
        setupFiles: ['./tests/setup.ts'],
        ...(process.env.CI && {
            minThreads: 4,
            maxThreads: 4
        })
    },
})