import { UserRoles } from '@prisma/client';
import {
	IsString,
	IsNotEmpty,
	IsEmail,
	Matches,
	MinLength,
	IsEnum,
	MaxLength
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@MaxLength(20)
	firstName: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@MaxLength(20)
	lastName: string;

	@ApiProperty()
	@IsEmail()
	@IsString()
	@IsNotEmpty()
	email: string;

	@ApiProperty({ required: false })
	@IsString()
	@Matches(/^(?:\d{3}\-){2}\d{3}$/, {
		message:
			'phone must be a valid number separated by dashes (e.g. 111-222-333)'
	})
	phone: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password: string;

	@ApiProperty({ enum: UserRoles })
	@IsNotEmpty()
	@IsEnum(UserRoles)
	role: UserRoles;
}
