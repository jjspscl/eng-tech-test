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
        const currentTodo = await this.getTodoById(id);
        if (!currentTodo) {
            throw new Error('Todo not found');
        }

        const query = await this.db.query<Duty>(`
            UPDATE todos SET name = $1, completed = $2 WHERE id = $3 RETURNING *;
        `, [name, completed, currentTodo.id]);

        return query.rows[0];    
    }
}


export default TodoRepository;