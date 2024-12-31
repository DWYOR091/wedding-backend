import { UserService } from './../../api/v1/user/user.service';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY,
        })
    }

    async validate(payload: any) {
        const user = await this.userService.getUserById(payload.id)
        if (!user) throw new HttpException('tes', HttpStatus.UNAUTHORIZED)

        return {
            id: user.id,
            email: user.email,
            role: user.role
        }
    }
}