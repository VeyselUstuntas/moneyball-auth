import { Role } from '@prisma/client'; // Prisma Enum

export class AuthResponse {
  id: number;
  name: string;
  lastname: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
