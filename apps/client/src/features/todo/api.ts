import { Duty } from "@repo/common";

const apiURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

const todoFetch = async (path: string, options: RequestInit) => {
    try {
        const response = await fetch(`${apiURL}${path}`, options);
        if (!response.ok) {
            console.error(response);
            throw new Error('Failed to fetch');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        alert("Something went wrong");
        throw error;
    }
}

export const getTodos = async () => {
    try {
        const data = await todoFetch('/todo/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return data as Duty[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const updateTodo = async (todo: Duty) => {
    try {
        const data = await todoFetch(`/todo/${todo.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        return data as Duty;
    } catch (error) {
        console.error(error);
        return todo;
    }
}

export const postTodo = async (todo: Omit<Duty, 'id'>) => {
    try {
        const data = await todoFetch('/todo/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        return data as Duty;
    } catch (error) {
        console.error('postTodo ->', error);
    }
}