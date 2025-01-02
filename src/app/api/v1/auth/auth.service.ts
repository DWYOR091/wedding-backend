/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async cekUser(email: string, password: string) {
    if (!email || !password) {
      throw new HttpException(
        'Email and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.findEmail(email);
    if (!user)
      throw new HttpException('User not signup!', HttpStatus.NOT_FOUND);

    const isValid = await this.userService.comparePassword(
      password,
      user.password,
    );
    if (!isValid)
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);

    return user;
  }

  generatetoken(user: any) {
    const dataToken = {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
    };
    const token = this.jwtService.sign(dataToken);
    return { token };
  }
}
