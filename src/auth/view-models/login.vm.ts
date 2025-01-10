import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginViewModel {
  @Expose()
  @ApiProperty()
  accessToken: string;

  @Expose()
  @ApiProperty()
  refreshToken: string;
}
