import * as bcrypt from 'bcryptjs';
import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { SignInResponseDto } from './dtos/sign-in-response.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { UserRoles } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { SignUpResponseDto } from './dtos/sign-up-response.dto';
import { UserResponseDto } from '../users/dtos/user-response.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService
	) {}

	async signUp({ email, password }: SignUpDto): Promise<SignUpResponseDto> {
		const userExists = await this.prismaService.user.findUnique({
			where: {
				email
			}
		});

		if (userExists) {
			throw new ConflictException();
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const user = await this.prismaService.user.create({
			data: {
				email,
				password: hashedPassword,
				role: UserRoles.USER
			}
		});

		const payload: JwtPayload = { email: user.email, sub: user.id };
		return {
			accessToken: await this.jwtService.signAsync(payload),
			user: new UserResponseDto(user)
		};
	}

	async signIn(signInDto: SignInDto): Promise<SignInResponseDto> {
		const user = await this.usersService.findOneByEmail(signInDto.email);
		const hashedPassword = user.password;

		const isValidPassword = await bcrypt.compare(
			signInDto.password,
			hashedPassword
		);

		if (!isValidPassword) {
			throw new HttpException('Invalid credentials', 400);
		}

		const payload: JwtPayload = { email: user.email, sub: user.id };
		return {
			accessToken: await this.jwtService.signAsync(payload)
		};
	}
}
