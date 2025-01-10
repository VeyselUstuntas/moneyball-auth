import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { RegisterRequestDto } from 'src/auth/dto/request/register.request.dto';
import { DatabaseService } from 'src/database/database.service';
import { UserDetails } from 'src/users/view-models/user-details.vm';
import { plainToClass } from 'class-transformer';
import { UserNotFoundException } from 'src/_common/exceptions/user-not-found.exception';
import { ResponseMessages } from 'src/_common/enums/ResponseMessages.enum';

@Injectable()
export class UsersService {
  constructor(@Inject() private readonly databaseService: DatabaseService) {}

  async createUser(
    registerRequestDto: RegisterRequestDto,
  ): Promise<UserDetails> {
    const newUser = await this.databaseService.user.create({
      data: registerRequestDto,
    });
    return new UserDetails({
      id: newUser.id,
      name: newUser.name,
      lastname: newUser.lastname,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    });
  }

  async isAvailableEmail(email: string): Promise<number> {
    const user = await this.databaseService.user.count({
      where: { email: email },
    });
    return user;
  }

  async findUserForLogin(email: string): Promise<User | null> {
    const user: User | null = await this.databaseService.user
      .findUniqueOrThrow({
        where: { email: email },
      })
      .catch(() => {
        throw new UserNotFoundException();
      });

    return user ?? null;
  }

  async getAllUser(): Promise<UserDetails[] | null> {
    try {
      const userList: UserDetails[] =
        await this.databaseService.user.findMany();
      const result = plainToClass(UserDetails, userList, {
        excludeExtraneousValues: true,
      });

      return result ?? null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findUserById(userId: number): Promise<User | null> {
    const user = await this.databaseService.user
      .findUniqueOrThrow({
        where: { id: userId },
      })
      .catch(() => {
        throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);
      });
    return user ?? null;
  }
}
