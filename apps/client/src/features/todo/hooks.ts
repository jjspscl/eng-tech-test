import { useState } from 'react';
import * as api from './api';
import { Duty } from '@repo/common';


export const useTodos = () => {
    const [todos, setTodos] = useState<Duty[]>([]);

    const getTodos = async () => {
        const todos = await api.getTodos();
        if (!todos) {
            return [];
        }
        setTodos([...todos]);
        return todos;
    };

    const createTodo = async (todo: Omit<Duty, 'id'>) => {
        const currentTodos = todos;
        const updatedTodos = [{
            ...todo,
            id: Math.random().toString(36).substring(2, 9),
        }, ...todos];
        setTodos(updatedTodos);

        // CREATE the todo on the server
        try {
            const serverTodo = await api.postTodo(todo);
            if (!serverTodo) {
                setTodos(currentTodos);
                return;
            }
            setTodos([serverTodo, ...todos]);
        } catch (error) {
            console.error("createTodo ->", error);
        }

    }

    const updateTodo = async (todo: Duty) => {
        const currentTodos = todos;
        const updatedTodos = todos.map((t) => {
            if (t.id === todo.id) {
                return todo;
            }
            return t;
        });
        setTodos(updatedTodos);

        // UPDATE the todo on the server
        const serverTodo = await api.updateTodo(todo);
        if (!serverTodo) {
            setTodos(currentTodos);
            return;
        }

        // Update the todo on the client
        const currentTodo = todos.findIndex((t) => t.id === serverTodo.id);
        updatedTodos[currentTodo] = serverTodo;
        setTodos(updatedTodos);
    }

    return {
        todos,
        getTodos,
        createTodo,
        updateTodo,
    };
}