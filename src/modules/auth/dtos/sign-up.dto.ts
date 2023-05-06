import { UserRoles } from '@prisma/client';
import {
	IsString,
	IsNotEmpty,
	IsEmail,
	MinLength,
	MaxLength
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
	@ApiProperty()
	@IsEmail()
	@IsString()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password: string;
}
