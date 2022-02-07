//!!!!!!!!!!!!!!!!!! GENARATED BY createModelInterface.sh - DON'T CHANGE IT !!!!!!!!!!!!!!!!!!

export enum Role {
  None = 'none',
  User = 'user',
  Admin = 'admin',
}

export interface AuthRoleTest {
  refIdx: number;
  role: Role;
}

//------------------------------------ auth ------------------------------------
export interface Auth {
  id: number;
  name: string;
  roles: Role[];
}

export interface JwtPayload {
  sub: string;
  username: string;
  roles: Role[];
}
