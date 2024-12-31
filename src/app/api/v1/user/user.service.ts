/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../../entities/user.entity';
import * as bcrypt from 'bcrypt'
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
    private userRepository: Repository<User>;
    constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
        this.userRepository = this.dataSource.getRepository(User);
    }

    async createUser(user: CreateUserDto) {
        const checkEmail = await this.findEmail(user.email)
        if (checkEmail) throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST)
        user.password = await this.hashPassword(user.password)
        const save = await this.userRepository.save(user)
        return plainToClass(User, save);
    }

    async getAllUser() {
        return await this.userRepository.find();
    }

    async getUserById(id: number) {
        const find = await this.userRepository.findOne({ where: { id } })
        if (!find) throw new HttpException(`User not found with id ${id}`, HttpStatus.BAD_REQUEST)
        return find
    }

    async updateUser(id: number, updateUser: UpdateUserDto) {
        const find = await this.userRepository.findOne({ where: { id } })
        if (!find) throw new HttpException(`User not found with id ${id}`, HttpStatus.BAD_REQUEST)

        const findEmail = await this.findEmail(updateUser.email)
        if (findEmail && findEmail.id !== find.id) throw new HttpException(`Email already exist`, HttpStatus.BAD_REQUEST)
        const update = this.userRepository.merge(find, updateUser);
        return await this.userRepository.save(update);
    }

    async deleteUser(id: number) {
        const find = await this.userRepository.findOne({ where: { id } })
        if (!find) throw new HttpException(`User not found with id ${id}`, HttpStatus.BAD_REQUEST)

        return find
    }

    async hashPassword(plainPass: string) {
        return await bcrypt.hash(plainPass, 10)
    }

    async comparePassword(plainPass: string, hashPass: string) {
        return await bcrypt.compare(plainPass, hashPass)
    }

    async findEmail(email: string): Promise<User> {
        const result = this.userRepository.findOne({ where: { email } });
        if (!result === null)
            throw new HttpException('Email not found!', HttpStatus.NOT_FOUND);
        return result;
    }
}
