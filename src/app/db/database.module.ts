import { databaseProviders } from './database.providers';
/*
https://docs.nestjs.com/modules
*/

import { Global, Module } from '@nestjs/common';
@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
