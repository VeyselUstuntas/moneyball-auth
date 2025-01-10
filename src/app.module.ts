import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { SecurityModule } from './security/security.module';
import { TokenModule } from './token/token.module';
import { HelpersModule } from './_common/helpers/helpers.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DatabaseModule,
    SecurityModule,
    TokenModule,
    HelpersModule,
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
