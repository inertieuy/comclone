import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';
import { userHandler } from './handler/user-handler';
import { jwt } from 'hono/jwt';

const app = new Hono();
app.use('*', cors());
app.get('/', (c) => {
  return c.json('Hello Hono!');
});

app.use(
  '/users/*',
  jwt({
    secret: Bun.env.JWTSECRET as string,
    cookie: {
      key: 'user',
    },
  }),
);

app.route('/', userHandler);
app.onError(async (err, c) => {
  if (err instanceof HTTPException) {
    c.status(err.status);
    return c.json({
      errors: err.message,
    });
  } else if (err instanceof ZodError) {
    c.status(400);
    return c.json({
      errors: err.message,
    });
  } else {
    c.status(500);
    return c.json({
      errors: err.message,
    });
  }
});

app.notFound((c) => c.json({ message: 'Route Not Found' }, 400));
export default {
  port: 5000,
  fetch: app.fetch,
};
