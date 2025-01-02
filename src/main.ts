import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './app/errors/custom-api-error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter());

  const options = new DocumentBuilder()
    .setTitle('Wedding API')
    .setDescription('The Wedding API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  document.tags = [
    {
      name: 'Auth',
      description: 'Endpoints for authentication',
    },
    {
      name: 'User',
      description: 'Endpoints for user',
    },
  ];
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
