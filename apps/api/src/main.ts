import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.setGlobalPrefix('api/v1', {
    exclude: [
      { path: 'health', method: RequestMethod.GET }, // Excludes /health GET requests
      'auth', // Excludes all methods for /auth
      'graphql', // Exclude /graphql
    ],
  });
  await app.listen(process.env.PORT ?? 3000);
};
bootstrap();
