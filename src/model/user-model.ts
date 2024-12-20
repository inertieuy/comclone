import { Role } from '@prisma/client';

export type RegisterUserRequest = {
  username: string;
  password: string;
  email: string;
  role: Role;
};
export type LoginUserRequest = {
  email: string;
  password: string;
};
export type UserResponse = {
  message?: string;
  username?: string;
  token?: string;
};

export type UserCurrent = {
  username: string;
  email: string;
  role: string;
};

export type UpdateUserRequest = {
  username?: string;
  email?: string;
};
export type ResetUserPassword = {
  password: string;
};
