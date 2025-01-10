import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterRequestDto } from './dto/request/register.request.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { ResponseMessages } from 'src/_common/enums/ResponseMessages.enum';
import { LoginRequestDto } from './dto/request/login.request.dto';
import { TokenService } from 'src/token/token.service';
import { UserNotFoundException } from 'src/_common/exceptions/user-not-found.exception';
import { LoginViewModel } from './view-models/login.vm';
import { AccessTokenViewModel } from './view-models/access-token.vm';
import { RefreshTokenIssue } from 'src/token/input-models/refresh-token-issue.im';
import { AccessTokenCreate } from 'src/token/input-models/access-token-create.im';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  //kayıt işlemi
  async register(data: RegisterRequestDto): Promise<LoginViewModel> {
    const isAvailableEmail = await this.isAvailableForRegister(data.email);
    if (isAvailableEmail === 0) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = await this.userService.createUser({
        ...data,
        password: hashedPassword,
      });

      const loginDto = new LoginRequestDto({
        email: newUser.email,
        password: data.password,
      });
      return this.login(loginDto);
      // return {
      //   user: newUser,
      // };
    } else {
      throw new BadRequestException(ResponseMessages.EMAIL_ALREADY_EXISTS);
    }
  }

  // giriş işlemi
  async login(data: LoginRequestDto): Promise<LoginViewModel> {
    const user = await this.userService.findUserForLogin(data.email);

    if (user) {
      if (bcrypt.compareSync(data.password, user.password)) {
        // tekrar aynı kullanıcının login işleminde eski oturumdan kalan refreshToken
        const currentRefreshToken = await this.tokenService.getRefreshToken(
          user.id,
        );

        let accessToken: string;
        let refreshToken: string;

        if (currentRefreshToken && currentRefreshToken.isValid) {
          refreshToken = currentRefreshToken.refreshToken.token;
          accessToken = await this.tokenService.refreshTokens(refreshToken);
          console.log('refresh tokne bumş ', refreshToken);
        } else {
          // valid değilse
          if (currentRefreshToken) {
            await this.tokenService.deleteRefreshToken(
              currentRefreshToken.refreshToken.token,
            );
            console.log('valide değilmiş');
          }

          // accessToken oluşturma
          accessToken = await this.tokenService.createAccessToken(
            new AccessTokenCreate({
              userId: user.id,
              roles: user.role,
              fullname: user.name,
              scopes: user.role === Role.ADMIN ? 'read write' : 'read',
            }),
          );

          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 3);
          //refreshToken olşuturma
          refreshToken = await this.tokenService.issueRefreshToken(
            new RefreshTokenIssue({
              userId: user.id,
              fullname: user.name,
              roles: user.role,
              expiryDate: expiryDate,
              scopes: user.role === Role.ADMIN ? 'read write' : 'read',
            }),
          );
          console.log('oluştur refresh ', refreshToken);
          // oluşturulan refreshToken veritabanını kayıt etme işlemi
          await this.tokenService.generateRefreshToken(
            new RefreshTokenIssue({
              token: refreshToken,
              userId: user.id,
              expiryDate: expiryDate,
            }),
          );
        }

        return {
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
      } else {
        throw new BadRequestException(ResponseMessages.PASSWORD_OR_EMAIL_WRONG);
      }
    } else {
      throw new UserNotFoundException();
    }
  }

  // varsayılan kullanıcı kontrolü
  async isAvailableForRegister(email: string): Promise<number> {
    const isAvailable = await this.userService.isAvailableEmail(email);
    return isAvailable;
  }

  // refresh token => accessToken
  async refreshTokens(refreshToken: string): Promise<AccessTokenViewModel> {
    const accessToken = await this.tokenService.refreshTokens(refreshToken);
    return { accessToken: accessToken };
  }

  async logout(authHeader: string) {
    await this.tokenService.deleteRefreshTokenByUserId(authHeader);
  }
}
