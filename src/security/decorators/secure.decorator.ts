/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { UserTypes } from 'src/_common/enums/UserTypes.enum';
import { RolesGuard } from '../guards/roles.guard';
import {
  applyDecorators,
  CanActivate,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';

export const ROLES_KEY = 'roles';

export function Secure(...roles: UserTypes[] | null) {
  const guards: (Function | CanActivate)[] = [AuthGuard];
  const decorators: (MethodDecorator | ClassDecorator | PropertyDecorator)[] = [
    ApiBearerAuth(),
  ];

  if (roles.length > 0) {
    guards.push(RolesGuard);
    decorators.push(SetMetadata(ROLES_KEY, roles));
  }

  decorators.push(UseGuards(...guards));

  return applyDecorators(...decorators);
}
