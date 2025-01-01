import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './_common/exceptions/http.exception.filter';
import { BadGatewayException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const findFirstError = (errors: ValidationError[]) => {
          for (const error of errors) {
            if (error.constraints) {
              return Object.values(error.constraints)[0];
            }
          }
        };
        const firstError = findFirstError(errors);
        console.log('first Error', firstError);
        return new BadGatewayException(firstError);
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
