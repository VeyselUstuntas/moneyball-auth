import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AccessTokenViewModel {
  @Expose()
  @ApiProperty()
  accessToken: string;
}
