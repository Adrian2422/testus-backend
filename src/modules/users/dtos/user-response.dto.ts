import { Exclude } from 'class-transformer';
import { UserRoles } from '@prisma/client';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
	@ApiProperty()
	id: number;
	@ApiProperty()
	firstName: string;
	@ApiProperty()
	lastName: string;
	@ApiProperty()
	email: string;
	@ApiProperty()
	phone: string;

	@ApiHideProperty()
	@Exclude()
	password: string;

	@ApiProperty({ enum: UserRoles })
	role: UserRoles;
	@ApiProperty()
	isBlocked: boolean;

	@Exclude()
	createdAt: Date;

	@Exclude()
	updatedAt: Date;

	constructor(partial: Partial<UserResponseDto>) {
		Object.assign(this, partial);
	}
}
