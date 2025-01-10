import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class UserDetails {
  @ApiProperty()
  @Expose()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  lastname: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Exclude()
  @ApiProperty()
  password: string;

  @Expose()
  @ApiProperty()
  role: Role;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  constructor(userResponse: Partial<UserDetails>) {
    Object.assign(this, userResponse);
  }
}
