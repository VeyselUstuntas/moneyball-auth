import { ApiProperty } from '@nestjs/swagger';

export class CustomerInput {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string | null;

  @ApiProperty()
  address: string | null;

  @ApiProperty()
  userId: number;

  constructor(customer: Partial<CustomerInput>) {
    Object.assign(this, customer);
  }
}
