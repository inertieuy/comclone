import { Hono } from 'hono';
import { LoginUserRequest, RegisterUserRequest } from '../model/user-model';
import { UserService } from '../service/user-service';
import { setCookie } from 'hono/cookie';

export const authHandler = new Hono<{}>();

authHandler.post('register', async (c) => {
  const register = (await c.req.json()) as RegisterUserRequest;

  const response = await UserService.register(register);

  return c.json({
    data: response,
  });
});
authHandler.post('login', async (c) => {
  const login = (await c.req.json()) as LoginUserRequest;

  const response = await UserService.login(login);

  setCookie(c, 'user', response.token!, {
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'Strict',
    maxAge: Math.floor(300),
  });
  return c.json({
    data: response,
  });
});
