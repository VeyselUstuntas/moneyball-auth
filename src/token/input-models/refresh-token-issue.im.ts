import { Role } from '@prisma/client';

export class RefreshTokenIssue {
  userId: number;
  roles: Role;
  scopes: string;
  fullname: string;
  token: string;
  expiryDate: Date;

  constructor(refreshTokenIssue: Partial<RefreshTokenIssue>) {
    Object.assign(this, refreshTokenIssue);
  }
}
