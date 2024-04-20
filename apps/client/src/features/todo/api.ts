import { Duty } from "@repo/common";
import z from "zod";
const apiURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

const todoFetch = async (path: string, options: RequestInit) => {
    try {
        const response = await fetch(`${apiURL}${path}`, options);
        if (!response.ok) {
            console.error(response);
            throw new Error('Failed to fetch');
        }

        if (response.status === 204) {
            return true;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
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

export const updateTodo = async (todo: Partial<Duty>) => {
    console.log('updateTodo ->', todo);
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

export const deleteTodo = async (id: string) => {
    try {
        const res = await todoFetch(`/todo/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await z.boolean().safeParseAsync(res);
        if (data.success) {
            return data.data;
        } else {
            throw new Error('Failed to delete');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}