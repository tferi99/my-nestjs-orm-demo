export interface User {
  id: number;
  name: string;
  password: string;
  admin: boolean;
}

export interface ChangePasswordDto {
  password: string;
}
