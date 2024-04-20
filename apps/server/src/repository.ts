import { Duty } from "@repo/common";
import { PoolClient } from "pg";

class TodoRepository {
    private db: PoolClient;
    constructor(
        db: PoolClient
    ) {
        this.db = db;
    }


    async getTodos() {
        const { rows } = await this.db.query(`
            SELECT * FROM todos;
        `);
        return rows;
    }

    async getTodoById(id: string) {
        const { rows } = await this.db.query(`
            SELECT * FROM todos WHERE id = $1;
        `, [id]);
        return rows;
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
}


export default TodoRepository;