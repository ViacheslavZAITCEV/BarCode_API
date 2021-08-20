import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UpdateUserDto {

	@ApiProperty()
	oldUser: UserDto;

	@ApiProperty()
	newUser: UserDto;
}