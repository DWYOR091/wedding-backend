import { Exclude } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum userRole {
    admin = 'admin',
    member = 'member',
}

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    @IsNotEmpty()
    id: number

    @Column()
    @IsNotEmpty()
    email: string

    @Column()
    @IsNotEmpty()
    @Exclude()
    password: string

    @Column({ type: 'enum', enum: userRole, default: userRole.member })
    role: userRole;

    @Column()
    @IsNotEmpty()
    fullname: string

    @Column({ nullable: true })
    @IsOptional()
    foto: string
}