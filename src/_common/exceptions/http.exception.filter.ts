import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseMessages } from '../enums/ResponseMessages.enum';
import { BaseResponse } from 'src/_base/response/Base.response';
import { DtoPrefix } from '../enums/ValidationMessage.enum';
// import { DtoPrefix } from '../enums/ValidationMessage.enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const dtoPrefix = Object.values(DtoPrefix);

    const validationMessage = dtoPrefix.find((prefix) => {
      return exception.message && exception.message.startsWith(prefix);
    });

    let responseMessage = '';

    if (validationMessage) {
      responseMessage = exception.message;
    } else {
      switch (status) {
        case 404:
          responseMessage = ResponseMessages.NOT_FOUND;
          break;
        case 401:
          responseMessage = ResponseMessages.UNAUTHORIZATION;
          break;
        case 403:
          responseMessage = ResponseMessages.FORBIDDEN;
          break;
        case 400:
          responseMessage = ResponseMessages.BAD_REQUEST;
          break;
        case 500:
          responseMessage = ResponseMessages.INTERNAL_SERVER_ERROR;
          break;
        case 502:
          responseMessage = ResponseMessages.BAD_GATEWAY;
          break;
        default:
          responseMessage = ResponseMessages.BAD_GATEWAY;
          break;
      }
    }

    response
      .status(status)
      .json(new BaseResponse(null, responseMessage, false));
  }
}
