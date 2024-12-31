import { AuthModule } from './app/api/v1/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './app/api/v1/user/user.module';
import { DatabaseModule } from './app/db/database.module';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './app/errors/custom-api-error';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class AppModule { }
