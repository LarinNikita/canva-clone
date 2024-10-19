import { Hono } from 'hono';
import { handle } from 'hono/vercel';

//? Revert to "edge" if you planning on running on the edge
export const runtime = 'nodejs';

const app = new Hono().basePath('/api');

app.get('/test', c => {
    return c.json({ message: 'Hono test api!' });
});

app.get('/user/:name', c => {
    const name = c.req.param('name');
    return c.json({ userName: name });
});

export const GET = handle(app);

export type AppType = typeof app;
