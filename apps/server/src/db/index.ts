import { Pool } from 'pg';
import { dbConfigSchema } from '../validators';
import dotenv from 'dotenv';
import z from 'zod';

dotenv.config();
const dbPool = (() => {
  try {
    const config = dbConfigSchema.parse(process.env);
  
    return new Pool({
      user: config.DB_USER,
      host: config.DB_HOST,
      database: config.DB_NAME,
      password: config.DB_PASSWORD,
      port: config.DB_PORT ?? 5432,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error.errors);
    }

    throw error;
  }
})();


export default dbPool;