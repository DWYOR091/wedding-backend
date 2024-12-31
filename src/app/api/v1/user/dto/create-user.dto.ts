import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { userRole } from "src/app/entities/user.entity";
import { Binary } from "typeorm";


export class UserDto {
    @IsNumber()
    id: number;

    @ApiProperty({ required: true, example: 'tes@gmail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ required: true, example: 'tes123456' })
    @IsString()
    password: string;

    @ApiProperty({ enum: userRole, default: userRole.member })
    @IsString()
    @IsOptional()
    role: userRole;

    @ApiProperty({ required: true, example: 'tus tas tes' })
    @IsOptional()
    @IsEnum(userRole)
    fullname: string;

    @ApiProperty({ format: 'binary' })
    @IsOptional()
    @IsString()
    foto: string;
}

export class CreateUserDto extends OmitType(UserDto, ['id']) { }
export class UserId extends PickType(UserDto, ['id']) { }
