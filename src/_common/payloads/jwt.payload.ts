import { Role } from '@prisma/client';

export interface JwtPayload {
  userId: number;
  roles: Role;
  scopes: string;
  fullname: string;
}
