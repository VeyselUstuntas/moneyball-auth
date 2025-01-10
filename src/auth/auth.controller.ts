import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/request/register.request.dto';
import { Request } from 'express';
import { BaseResponse } from 'src/_base/response/Base.response';
import { ResponseMessages } from 'src/_common/enums/ResponseMessages.enum';
import { LoginRequestDto } from './dto/request/login.request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RefreshTokenRequestDto } from './dto/request/refresh-token.request.dto';
import { LoginInput } from './input-models/login.im';
import { ObjectTransformer } from 'src/_common/helpers/object-transformer';
import { RegisterInput } from './input-models/register.im';
import { RefreshTokenInput } from './input-models/refresh-token.im';
import { AccessTokenViewModel } from './view-models/access-token.vm';
import { Secure } from 'src/security/decorators/secure.decorator';
import { LoginViewModel } from './view-models/login.vm';
import { RegisterViewModel } from './view-models/register.vm';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly objectTransformer: ObjectTransformer,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login İşlemi' })
  @ApiResponse({ description: 'Login', type: LoginViewModel })
  async login(
    @Body() loginInput: LoginInput,
  ): Promise<BaseResponse<LoginViewModel>> {
    const loginDto = this.objectTransformer.transform(
      loginInput,
      LoginRequestDto,
    );
    const userLoginResult: LoginViewModel =
      await this.authService.login(loginDto);

    return new BaseResponse<LoginViewModel>(
      userLoginResult,
      ResponseMessages.SUCCESS,
      true,
    );
  }

  @Post('register')
  async register(
    @Body() registerInput: RegisterInput,
  ): Promise<BaseResponse<RegisterViewModel>> {
    const registerDto = this.objectTransformer.transform(
      registerInput,
      RegisterRequestDto,
    );
    const userRegisterResult: RegisterViewModel =
      await this.authService.register(registerDto);

    return new BaseResponse<RegisterViewModel>(
      userRegisterResult,
      ResponseMessages.SUCCESS,
      true,
    );
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh Token' })
  async refreshToken(
    @Body() refreshTokenInput: RefreshTokenInput,
  ): Promise<BaseResponse<AccessTokenViewModel>> {
    const refreshTokenDto = this.objectTransformer.transform(
      refreshTokenInput,
      RefreshTokenRequestDto,
    );

    const accessToken = await this.authService.refreshTokens(
      refreshTokenDto.refreshToken,
    );
    return new BaseResponse<AccessTokenViewModel>(
      accessToken,
      ResponseMessages.SUCCESS,
      true,
    );
  }

  @Post('logout')
  @Secure()
  async logOut(@Req() req: Request): Promise<void> {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      await this.authService.logout(authHeader);
    }
  }
}
