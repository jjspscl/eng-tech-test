import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        ...(process.env.CI && {
            minThreads: 4,
            maxThreads: 4
        })
    },
})