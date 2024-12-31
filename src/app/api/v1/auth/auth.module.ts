import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from 'src/app/common/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        ConfigModule.forRoot(),
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '12h' }
        })
    ],
    controllers: [
        AuthController,],
    providers: [
        AuthService, JwtStrategy],
    exports: []
})
export class AuthModule { }
