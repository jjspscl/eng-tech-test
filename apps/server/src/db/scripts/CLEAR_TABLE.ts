import dbPool from "..";

const CLEAR_TABLE = async () => {
    const client = await dbPool.connect();
    try {
        await client.query(`
            DELETE FROM todos;
        `);
    } catch (error) {
        console.error(error);
    } finally {
        client.release();
    }
}


export default CLEAR_TABLE;