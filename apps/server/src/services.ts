import * as http from 'http';
import z from 'zod';
import { dutySchema } from '@repo/common';
import { Context } from '.';

export const getTodoById = async (
    {
        req,
        res,
    }: Context,
    id: string,
) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'GET Todo by ID' }));
}

export const getTodos = async (
    {
        res,
        todoRepo
    }: Context,
) => {
    const todos = await todoRepo.getTodos();
    console.log("getTodos", todos)
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
        const newDuty = dutySchema.parse(body);

        const newTodo = await todoRepo.createTodo(
            newDuty.name,
            newDuty.completed
        );

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newTodo));
        
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(error.errors));
      } 
    }
}