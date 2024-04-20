import * as http from 'http';
import * as services from './services';
import z from 'zod';
import dbPool from './db';
import { PoolClient } from 'pg';
import TodoRepository from './repository';


export interface Context {
    req: http.IncomingMessage,
    res: http.ServerResponse,
    todoRepo: TodoRepository,
}
const server = http.createServer(async (req, res) => {
    const reqURL = new URL(req.url || '', `http://${req.headers.host}`);

    // ALLOW CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    const db = await dbPool.connect();
    const todoRepo = new TodoRepository(db);
    const ctx: Context = {
        todoRepo,
        req,
        res,
    }

    try {
        if (reqURL.pathname.match(/^\/todo(\/.*)?$/)) {
            switch (req.method) {
                case 'GET':
                    const id = req.url?.split('/')[2];

                    if (id) {
                        await services.getTodoById(ctx, id);
                        break;
                    } else {
                        await services.getTodos(ctx);
                        break;
                    }
                case 'POST':
                    let body = '';
                    req.on('data', (chunk) => {
                        body += chunk;
                    });
                    req.on('end', async () => {
                        const todo = JSON.parse(body);
                        services.createTodo(ctx, todo);
                    });
                    break;
                default:
                    res.writeHead(405, { 'Content-Type': 'text/html' });
                    res.end('Method Not Allowed');
                    break;
            }

        } else {
            res.writeHead(404, { 'Content-Type': 'text/json' });
            res.end('Not Found');
        }
    } catch (err) {
        if (err instanceof z.ZodError) {
            res.writeHead(400, { 'Content-Type': 'text/json' });
            res.end(JSON.stringify(err.errors));
        }

        res.writeHead(500, { 'Content-Type': 'text/json' });
        res.end('Internal Server Error');
    }
});

server.on('error', (err) => {
    console.log("UNCAUGHT ERROR", err)
    process.exit(1);
});

const PORT = process.env.SERVER_PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});