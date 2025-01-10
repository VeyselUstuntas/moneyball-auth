import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './_common/exceptions/http.exception.filter';
import { BadGatewayException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

  app.enableCors({
    origin: 'http://localhost:9000', // Frontend'inizin çalıştığı adres
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization', // İzin verilen başlıklar
    credentials: true, // Eğer token çerezle gönderiliyorsa
  });

  const config = new DocumentBuilder()
    .setTitle('Auth Example')
    .setDescription('The Authentication API description')
    .setVersion('1.0')
    .addTag('auth')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
