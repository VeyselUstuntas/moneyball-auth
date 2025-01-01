/* eslint-disable prettier/prettier */
import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/request/register.request.dto';
import { Response } from 'express';
import { RegisterResponse, RegisterResponseDto } from './dto/response/register.response.dto';
import { BaseResponse } from 'src/_base/response/Base.response';
import { ResponseMessages } from 'src/_common/enums/ResponseMessages.enum';
import { LoginRequestDto } from './dto/request/login.request.dto';
import { LoginResponseDto } from './dto/response/login.response.dto';

@Controller('auth')
export class AuthController {
    constructor(@Inject(AuthService) private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() body: LoginRequestDto, @Res() res: Response<LoginResponseDto>): Promise<void> {
        try {
            const userLoginResult = await this.authService.login(body);

            res.json(
                new BaseResponse(
                    {
                        accessToken: userLoginResult.accessToken,
                        refreshToken: userLoginResult.refreshToken,
                        user: userLoginResult.user
                    },
                    ResponseMessages.SUCCESS,
                    true
                )
            );

        } catch (ex) {
            throw ex;
        }
    }

    @Post('register')
    async register(@Body() body: RegisterRequestDto, @Res() res: Response<RegisterResponseDto>): Promise<void> {
        try {
            const userRegisterResult: RegisterResponse = await this.authService.register(body);

            res.json(
                new BaseResponse<RegisterResponse>(
                    {
                        user: userRegisterResult.user,
                        accessToken: userRegisterResult.accessToken,
                        refreshToken: userRegisterResult.refreshToken
                    },
                    ResponseMessages.SUCCESS,
                    true
                ));

        }
        catch (ex) {
            throw ex;
        }
    }

    @Post('logout')
    async logOut() {
        return 'logout';
    }

    @Post('reset-password')
    async resetPassword() {
        return 'reset password';
    }
}
