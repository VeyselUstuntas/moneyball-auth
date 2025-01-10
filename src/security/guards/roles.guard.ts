import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserTypes } from 'src/_common/enums/UserTypes.enum';
import { ROLES_KEY } from '../decorators/secure.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserTypes[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const headers = request.headers;
    const authHeader = headers['authorization'];
    const token = authHeader.split(' ')[1];

    const payload = await this.jwtService.verify(token);

    const role = payload.roles;
    const scope = payload.scopes;
    console.log('SCOPR', scope);
    console.log('SCOPR', role);

    if (!requiredRoles.includes(role)) {
      throw new ForbiddenException('You do not have the required role');
    }

    if (!scope || !scope.includes('write')) {
      throw new ForbiddenException(
        'You do not have the required scope for this action',
      );
    }

    return true;
    // return requiredRoles.includes(payload.roles);
  }
}
