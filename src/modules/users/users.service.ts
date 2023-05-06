import * as bcrypt from 'bcryptjs';
import {
	ClassSerializerInterceptor,
	ConflictException,
	Injectable,
	NotFoundException,
	UseInterceptors
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserResponseDto } from './dtos/user-response.dto';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	@UseInterceptors(ClassSerializerInterceptor)
	async findOne(id: number): Promise<UserResponseDto> {
		const user = await this.prismaService.user.findUnique({
			where: {
				id
			}
		});

		if (!user) {
			throw new NotFoundException();
		}

		return new UserResponseDto(user);
	}

	async findOneByEmail(email: string): Promise<UserResponseDto> {
		const user = await this.prismaService.user.findUnique({
			where: {
				email
			}
		});

		if (!user) {
			throw new NotFoundException();
		}

		return new UserResponseDto(user);
	}

	async create({
		email,
		password,
		...rest
	}: CreateUserDto): Promise<UserResponseDto> {
		const user = await this.prismaService.user.findUnique({
			where: {
				email
			}
		});

		if (user) {
			throw new ConflictException('This email is already taken.');
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		return this.prismaService.user.create({
			data: {
				email,
				password: hashedPassword,
				...rest
			}
		});
	}
}
