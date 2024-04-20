import { Duty } from "@repo/common";
import { PoolClient } from "pg";

class TodoRepository {
    private db: PoolClient;
    constructor(
        db: PoolClient
    ) {
        this.db = db;

        this.db.on('error', (err) => {
            console.error('Unexpected error on idle client', err);
            process.exit(-1);
        });
    }


    async getTodos() {
        const { rows } = await this.db.query(`
            SELECT * FROM todos ORDER BY updated_at DESC;
        `);
        return rows;
    }

    async getTodoById(id: string) {
        const { rows } = await this.db.query<Duty>(`
            SELECT * FROM todos WHERE id = $1;
        `, [id]);
        return rows[0];
    }

    async createTodo(
        name: string,
        completed: boolean
    ) {
        const query = await this.db.query<Duty>(`
            INSERT INTO todos (name, completed) VALUES ($1, $2) RETURNING *;
        `, [name, completed]);
        
        return query.rows[0];
    }

    async updateTodo(
        id: string,
        name: string,
        completed: boolean
    ) {
        const query = await this.db.query<Duty>(`
            UPDATE todos 
            SET name = $1, completed = $2, updated_at = NOW()
            WHERE id = $3 RETURNING *;
        `, [name, completed, id]);

        return query.rows[0];    
    }

    async deleteTodo(
        id: string
    ) {
        await this.db.query(`
            DELETE FROM todos WHERE id = $1;
        `, [id]);
    }
}


export default TodoRepository;