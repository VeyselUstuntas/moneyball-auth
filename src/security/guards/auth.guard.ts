import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ResponseMessages } from 'src/_common/enums/ResponseMessages.enum';
import { jwtConstants } from 'src/auth/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log('authGuard içi token: ', token);
    if (!token) {
      console.log('secure off');
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZATION);
    }
    try {
      console.log('secure on');
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      console.log('1');
      console.log('paylod ', payload);
      console.log('2');

      request['user'] = payload;
    } catch (error) {
      console.log('hatasıda bu ', error);
      console.log('haırsormadı');
      throw new UnauthorizedException(ResponseMessages.UNAUTHORIZATION);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
