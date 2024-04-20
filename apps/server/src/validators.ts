import z from "zod";


export const dbConfigSchema = z.object({
    DB_HOST: z.string(),
    DB_PORT: z.string().transform((val) => {
        if (!isNaN(Number(val))) {
            return Number(val);
        }
        return 5432;
    }),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string()
});

