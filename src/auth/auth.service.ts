import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { genSalt, hash, compare } from 'bcryptjs'
import { InjectModel } from 'nestjs-typegoose';
import { USER_NOT_FOUNDED, WRONG_PASSWORD } from './auth.constatnts';
import { UserModel } from './user.model';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class AuthService {

	constructor(
		@InjectModel(UserModel) private readonly authModel: ModelType<UserModel>,
		private readonly jwtService: JwtService
	) { }


	async createUser(dto: CreateUserDto): Promise<DocumentType<UserModel>> {
		const salt = await genSalt(10);
		const hashPassword = await hash(dto.password, salt)
		const newUser = await new this.authModel({
			login: dto.login,
			password: hashPassword
		})
		return await newUser.save();
	}


	async findUser(login: string) {
		return this.authModel.findOne({ login }).exec();
	}


	async validateUser(login: string, password: string): Promise<Pick<UserModel, 'login'>> {
		const user: UserModel = await this.findUser(login);
		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUNDED)
		}
		const isCorrectPassword = await compare(password, user.password)
		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD)
		}
		return { login: user.login }
	}

	async login(login: string) {
		const payload = { login };
		return {
			acces_token: await this.jwtService.signAsync(payload)
		}
	}


}
