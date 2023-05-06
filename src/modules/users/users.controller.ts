import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserResponseDto } from './dtos/user-response.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@ApiTags('User')
@Controller('api/users')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Get(':id')
	@ApiOkResponse({ type: UserResponseDto })
	async findOne(@Param('id', ParseIntPipe) userId: number) {
		return this.userService.findOne(userId);
	}

	@Post()
	@ApiCreatedResponse({ type: UserResponseDto })
	async create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}
}
