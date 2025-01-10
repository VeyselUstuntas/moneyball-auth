import { Role } from '@prisma/client';

export class AccessTokenCreate {
  userId: number;
  roles: Role;
  scopes: string;
  fullname: string;

  constructor(refreshTokenIssue: Partial<AccessTokenCreate>) {
    Object.assign(this, refreshTokenIssue);
  }
}
