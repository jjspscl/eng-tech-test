import * as http from 'http';
import z from 'zod';
import { Duty, dutySchema } from '@repo/common';
import { Context } from '.';

export const getTodoById = async (
    {
        res,
        todoRepo
    }: Context,
    id: string,
) => {
    const todo = await todoRepo.getTodoById(id);
    if (!todo) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Todo not found' }));
    }
    
    return todo;
}

export const getTodos = async (
    {
        res,
        todoRepo
    }: Context,
) => {
    const todos = await todoRepo.getTodos();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(todos));
}

export const createTodo = async (
    {
        res,
        todoRepo
    }: Context,
    body: any,
) => {
    try {
        const data = await dutySchema.safeParseAsync(body);
        if (data.success) {
            const newDuty = data.data;
            const newTodo = await todoRepo.createTodo(
                newDuty.name,
                newDuty.completed
            );

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newTodo));
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data.error));
        }
        
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(error.errors));
      } 
    }
}

export const updateTodo = async (
    {
        res,
        todoRepo
    }: Context,
    currentTodo: Duty,
    body: Duty,
) => {
    try {
        const data = await dutySchema.safeParseAsync(body);
        if (data.success) {
            const newDuty = data.data;

            const updatedTodo = await todoRepo.updateTodo(
                currentTodo.id,
                newDuty.name,
                newDuty.completed
            );

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedTodo));
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data.error));
        }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(error.errors));
      } 
    }
}