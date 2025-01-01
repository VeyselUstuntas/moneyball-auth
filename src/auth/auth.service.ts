import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterRequestDto } from './dto/request/register.request.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterResponse } from './dto/response/register.response.dto';
import { ResponseMessages } from 'src/_common/enums/ResponseMessages.enum';
import { LoginResponse } from './dto/response/login.response.dto';
import { LoginRequestDto } from './dto/request/login.request.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly userService: UsersService,
  ) {}

  async register(data: RegisterRequestDto): Promise<RegisterResponse> {
    const isAvailableEmail = await this.isAvailableForRegister(data.email);
    if (isAvailableEmail) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = await this.userService.createUser({
        ...data,
        password: hashedPassword,
      });
      const accessToken = null;
      const refreshToken = null;
      return {
        user: newUser,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    }
  }

  async login(data: LoginRequestDto): Promise<LoginResponse> {
    const user = await this.userService.findUserForLogin(data.email);

    if (user && bcrypt.compareSync(data.password, user.password)) {
      const accessToken = null;
      const refreshToken = null;
      return {
        user: user,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    }
  }

  private async isAvailableForRegister(email: string): Promise<boolean> {
    const isAvailable = await this.userService.isAvailableEmail(email);

    if (isAvailable !== 0) {
      throw new BadRequestException(ResponseMessages.EMAIL_ALREADY_EXISTS);
    }

    return true;
  }
}
