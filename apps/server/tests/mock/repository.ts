import { PoolClient } from "pg";

const todos = [
    {
        id: "1",
        name: 'Test Todo',
        completed: false
    },
    {
        id: "2",
        name: 'Test Todo 2',
        completed: false
    },
    {
        id: "3",
        name: 'Test Todo 3',
        completed: false
    }
]

export class MockTodoRepository {
    constructor(db) {}

    async getTodos() {
       return todos;
    }

    async getTodoById(id: string) {
        return todos.find(todo => todo.id === id);
    }

    async createTodo(
        name: string,
        completed: boolean
    ) {
        const todo = {
            id: Math.random().toString(36).substring(2, 9),
            name,
            completed
        }

        todos.push(todo);
        return todo;
    }

    async updateTodo(
        id: string,
        name: string,
        completed: boolean
    ) {
        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            return null;
        }

        todo.name = name;
        todo.completed = completed;
        return todo; 
    }
}
