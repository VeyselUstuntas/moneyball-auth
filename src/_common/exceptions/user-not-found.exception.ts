import { HttpException, HttpStatus } from '@nestjs/common';
import { ResponseMessages } from '../enums/ResponseMessages.enum';

export class UserNotFoundException extends HttpException {
  constructor() {
    super(ResponseMessages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
