import { UserController } from './user.controller';
import { UserService } from './user.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        UserController,],
    providers: [
        UserService,],
    exports: [UserService]
})
export class UserModule { }
