import dbPool from "..";

const CREATE_DB = async () => {
    const client = await dbPool.connect();
    try {
        await client.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            CREATE TABLE todos (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                name VARCHAR(255) NOT NULL,
                completed BOOLEAN NOT NULL DEFAULT false,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `);
    } catch (error) {
        console.error(error);
    } finally {
        client.release();
    }
}


export default CREATE_DB;