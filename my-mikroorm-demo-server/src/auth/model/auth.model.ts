export enum Role {
  None = 'none',
  User = 'user',
  Admin = 'admin',
}

export interface User {
  id: number;
  name: string;
  password: string;
  admin: boolean;
}

export interface Auth {
  id: number;
  name: string;
  roles: Role[];
}

export interface AuthRoleTest {
  refIdx: number;
  role: Role;
}

export interface JwtPayload {
  sub: string;
  username: string;
  roles: Role[];
}

export interface ChangePasswordDto {
  password: string;
}

export interface LoginResult {
  access_token: string;
}
