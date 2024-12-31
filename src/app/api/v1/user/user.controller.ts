/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/app/common/guards/jwt-auth.guard';


@Controller('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() createUser: CreateUserDto) {
        const result = await this.userService.createUser(createUser);
        return {
            message: 'User created successfully',
            data: result
        }
    }

    @Get()
    async findAll() {
        const result = await this.userService.getAllUser()
        return {
            data: result
        }
    }

    @Get('/:id')
    async findOne(@Param('id') id: number) {
        const result = await this.userService.getUserById(+id)
        return {
            data: result
        }
    }

    @Patch('/update/:id')
    async update(@Param('id') id: number, @Body() updateUser: UpdateUserDto) {
        const result = await this.userService.updateUser(+id, updateUser)
        return {
            message: 'User updated successfully',
            data: result
        }
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: number) {
        await this.userService.deleteUser(+id)
        return {
            message: 'User deleted successfully',
        }
    }
}
