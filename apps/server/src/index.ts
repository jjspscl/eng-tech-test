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
const db = dbPool.connect().then(async (client: PoolClient) => {
    return client;
});
const server = http.createServer(async (req, res) => {
    const reqURL = new URL(req.url || '', `http://${req.headers.host}`);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    const todoRepo = new TodoRepository(await db);
    const ctx: Context = {
        todoRepo,
        req,
        res,
    }

    console.log(`${req.method} ${reqURL.pathname}`);
    try {
        if (reqURL.pathname.match(/^\/todo(\/.*)?$/)) {
            let id: string = '';
            switch (req.method) {
                case 'GET':
                    id = req.url?.split('/')[2] || '';
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
                case 'PUT':
                    id = req.url?.split('/')[2] || '';
                    if (id) { 
                        const currentTodo = await services.getTodoById(ctx, id);
                        if (!currentTodo) break;

                        let putBody = '';
                        req.on('data', (chunk) => {
                            putBody += chunk;
                        });
                        req.on('end', async () => {
                            const todo = JSON.parse(putBody);
                            services.updateTodo(ctx, currentTodo, todo);
                        });
                        break;
                    } else {
                        res.writeHead(405, { 'Content-Type': 'text/html' });
                        res.end('Method Not Allowed');
                        break;
                    }


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