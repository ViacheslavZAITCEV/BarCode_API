import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ALREADY_REGISTRED_USER } from './auth.constatnts';
import { UserModel } from './user.model';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) { }

	/**
	* List of modules to include in the specification
	*/

	@ApiBody({ type: UserModel })
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: UserModel) {
		const oldUser = await this.authService.findUser(dto.login)
		if (oldUser) {
			throw new BadRequestException(ALREADY_REGISTRED_USER)
		}
		return this.authService.createUser(dto);
	}

	@ApiBody({ type: UserModel })
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: UserModel) {
		const user = await this.authService.validateUser(dto.login, dto.password);
		return this.authService.login(user.login)
	}


	// @Post('update')
	// async update(@Body() dtodto: Omit<UserModel, '_id'>) {

	// }


	@ApiBody({ type: 'string' })
	@Delete('delete/:login')
	async delete(@Param('login') login: string) {
		return await this.authService.delete(login);
	}



}
