import * as http from 'http';
import * as services from './services';

const server = http.createServer(async (req, res) => {
    const reqURL = new URL(req.url || '', `http://${req.headers.host}`);
    
    try {
        if (reqURL.pathname.match(/^\/todo(\/.*)?$/)) {
            switch (req.method) {
                case 'GET':
                    const id = req.url?.split('/')[2];

                    if (id) {
                        await services.getTodoById(req, res, id);
                        break;
                    } else {
                        await services.getTodos(req, res);
                        break;
                    }
                case 'POST':
                    let body = '';
                    req.on('data', (chunk) => {
                        body += chunk;
                    });
                    req.on('end', async () => {
                        const todo = JSON.parse(body);
                        services.createTodo(req, res, todo);
                    });
                    break;
                default:
                    res.writeHead(405, { 'Content-Type': 'text/html' });
                    res.end('<h1>Method Not Allowed</h1>');
                    break;
            }

        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>Not Found</h1>');
        }
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>Internal Server Error</h1>');
    }
});

const PORT = process.env.SERVER_PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});