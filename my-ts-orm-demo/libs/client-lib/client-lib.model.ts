export enum Role {
  None = 'none',
  User = 'user',
  Admin = 'admin',
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
  exp: number;
  iat: number;
}

export interface ChangePasswordDto {
  password: string;
}
