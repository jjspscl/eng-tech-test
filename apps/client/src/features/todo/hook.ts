import { useEffect, useState } from 'react';
import * as api from './api';
import { Duty } from '@repo/common';


export const useTodos = () => {
    const [todos, _setTodos] = useState<Duty[]>([]);

    useEffect(() => {
        window.addEventListener("todo-update", () => {
            const todosString = localStorage.getItem("todos");
            if (!todosString) {
                return;
            }

            const todos = JSON.parse(todosString) as Duty[];
            _setTodos([...todos]);
        });

        getTodos();


        return () => {
            window.removeEventListener("todo-update", () => {});
        }
    }, []);

    const setTodos = (todos: Duty[]) => {
        _setTodos([...todos]);

        const todosString = JSON.stringify(todos);
        localStorage.setItem("todos", todosString);
        window.dispatchEvent(new Event("todo-update"));
    }

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

    const updateTodo = async (todo: Partial<Duty>) => {
        const currentTodos = todos;
        const updatedTodos = todos.map((t) => {
            if (t.id === todo.id) {
                return todo;
            }
            return t;
        });
        setTodos(updatedTodos as Duty[]);

        // UPDATE the todo on the server
        const serverTodo = await api.updateTodo(todo);
        if (!serverTodo) {
            setTodos(currentTodos);
            return;
        }

        // Update the todo on the client
        const currentTodo = todos.findIndex((t) => t.id === serverTodo.id);
        updatedTodos[currentTodo] = serverTodo;
        setTodos(updatedTodos as Duty[]);
    }

    const deleteTodo = async (id: string) => {
        const currentTodos = todos;
        const updatedTodos = todos.filter((t) => t.id !== id);
        console.log('deleteTodo ->', currentTodos, updatedTodos);
        setTodos(updatedTodos);

        // DELETE the todo on the server
        try {
            await api.deleteTodo(id);
        } catch (error) {
            console.error("deleteTodo err ->", error);
            setTodos(currentTodos);
        }
    }

    return {
        todos,
        getTodos,
        createTodo,
        updateTodo,
        deleteTodo,
    };
}