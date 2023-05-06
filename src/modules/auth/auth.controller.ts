import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	UseInterceptors
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { Public } from '../../common/decorators/public.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Public()
	@Post('signin')
	signIn(@Body() signInDto: SignInDto) {
		return this.authService.signIn(signInDto);
	}

	@HttpCode(HttpStatus.OK)
	@Public()
	@Post('/signup')
	signup(@Body() body: SignUpDto) {
		return this.authService.signUp(body);
	}
}
