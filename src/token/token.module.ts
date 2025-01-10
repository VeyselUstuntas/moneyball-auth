import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [TokenService],
  exports: [TokenService],
  imports: [
    DatabaseModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
  ],
})
export class TokenModule {}
