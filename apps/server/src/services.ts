import * as http from 'http';

export const getTodoById = async (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    id: string,
) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'GET Todo by ID' }));
}

export const getTodos = async (
    req: http.IncomingMessage,
    res: http.ServerResponse,
) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'GET Todos' }));
}

export const createTodo = async (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    body: any,
) => {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'POST Todo' }));
}