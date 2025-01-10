import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RefreshTokenIssue } from './input-models/refresh-token-issue.im';
import { JwtService } from '@nestjs/jwt';
import { ResponseMessages } from 'src/_common/enums/ResponseMessages.enum';
import { GetRefreshTokenViewModel } from './view-models/get-refresh-token.vm';
import { RefreshTokenViewModel } from './view-models/refresh-token.vm';
import { JwtPayload } from 'src/_common/payloads/jwt.payload';
import { AccessTokenCreate } from './input-models/access-token-create.im';

@Injectable()
export class TokenService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async createAccessToken(accessToken: AccessTokenCreate): Promise<string> {
    return this.jwtService.signAsync(
      {
        userId: accessToken.userId,
        fullname: accessToken.fullname,
        roles: accessToken.roles,
        scopes: accessToken.scopes,
      },
      { expiresIn: '7s' },
    );
  }

  //refreshToken oluşturuyoruz
  async issueRefreshToken(refreshToken: RefreshTokenIssue): Promise<string> {
    return this.jwtService.signAsync(
      {
        userId: refreshToken.userId,
        fullname: refreshToken.fullname,
        roles: refreshToken.roles,
        scopes: refreshToken.scopes,
      },
      { expiresIn: refreshToken.expiryDate.getDate() },
    );
  }

  //database'e kaydediyoruz
  async generateRefreshToken(refreshToken: RefreshTokenIssue): Promise<void> {
    try {
      await this.databaseService.refreshToken.create({
        data: {
          token: refreshToken.token,
          userId: refreshToken.userId,
          expiryDate: refreshToken.expiryDate,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  // tekraradan login olan kullanıcının eski refresh token'ı veritabanından silinir
  async deleteRefreshToken(token: string): Promise<void> {
    try {
      await this.databaseService.refreshToken.delete({
        where: { token: token },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteRefreshTokenByUserId(authHeader: string): Promise<void> {
    const token = authHeader.split(' ')[1];
    const payload = await this.jwtService.verify(token);

    const userId = payload.userId;

    try {
      await this.databaseService.refreshToken.delete({
        where: { userId: userId },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findRefreshTokenByTokenValue(
    token: string,
  ): Promise<RefreshTokenViewModel | null> {
    try {
      const refreshToken: RefreshTokenViewModel =
        await this.databaseService.refreshToken.findUnique({
          where: { token: token },
          select: { token: true, userId: true, expiryDate: true },
        });
      return refreshToken ?? null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findRefreshTokenByUserId(
    userId: number,
  ): Promise<RefreshTokenViewModel | null> {
    try {
      const refreshToken: RefreshTokenViewModel =
        await this.databaseService.refreshToken.findUnique({
          where: { userId: userId },
          select: { token: true, userId: true, expiryDate: true },
        });
      return refreshToken ?? null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getRefreshToken(
    userId: number,
  ): Promise<GetRefreshTokenViewModel | null> {
    try {
      const refreshToken: RefreshTokenViewModel | null =
        await this.findRefreshTokenByUserId(userId);

      if (refreshToken) {
        const tokenValid = this.isTokenValid(refreshToken.expiryDate);

        return { refreshToken: refreshToken, isValid: tokenValid };
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  isTokenValid(refreshToken: Date): boolean {
    const nowDate = new Date();
    if (refreshToken.getDate() > nowDate.getDate()) {
      return true;
    }
    return false;
  }

  // refresh endpoint kullanılarak süresi dolan accessToken yerine yeni accessToken olşuturulur
  async refreshTokens(refreshToken: string): Promise<string> {
    const refreshTokenResponse: RefreshTokenViewModel =
      await this.findRefreshTokenByTokenValue(refreshToken);

    if (refreshTokenResponse) {
      const payload: JwtPayload = await this.jwtService.decode(
        refreshTokenResponse.token,
      );

      const tokenIsValid = this.isTokenValid(refreshTokenResponse.expiryDate);
      if (!tokenIsValid) {
        console.log('yeni verilemeyen accessToken Hatası2');
        throw new UnauthorizedException(ResponseMessages.UNAUTHORIZATION);
      }
      const newAccessToken = this.createAccessToken(
        new AccessTokenCreate({
          userId: payload.userId,
          roles: payload.roles,
          fullname: payload.fullname,
          scopes: payload.scopes,
        }),
      );
      return newAccessToken;
    }
    console.log('yeni verilemeyen accessToken Hatası');
    throw new UnauthorizedException(ResponseMessages.UNAUTHORIZATION);
  }
}
