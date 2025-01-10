import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CustomerViewModel {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  phone: string | null;

  @ApiProperty()
  @Expose()
  address: string | null;

  @ApiProperty()
  @Expose()
  userId: number;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date | null;

  constructor(customer: Partial<CustomerViewModel>) {
    Object.assign(this, customer);
  }
}
