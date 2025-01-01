import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthResponse } from 'src/_common/response/auth.response';
import { RegisterRequestDto } from 'src/auth/dto/request/register.request.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(@Inject() private readonly databaseService: DatabaseService) {}

  async createUser(
    registerRequestDto: RegisterRequestDto,
  ): Promise<AuthResponse> {
    const newUser = await this.databaseService.user.create({
      data: registerRequestDto,
    });
    return {
      id: newUser.id,
      name: newUser.name,
      lastname: newUser.lastname,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }

  async isAvailableEmail(email: string): Promise<number> {
    const user = await this.databaseService.user.count({
      where: { email: email },
    });
    return user;
  }

  async findUserForLogin(email: string): Promise<User | null> {
    const user: User | null = await this.databaseService.user.findUnique({
      where: { email: email },
    });
    return user;
  }
}
