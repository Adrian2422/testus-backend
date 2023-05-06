import { UserResponseDto } from '../../users/dtos/user-response.dto';

export class SignUpResponseDto {
	accessToken: string;
	user: UserResponseDto;
}
