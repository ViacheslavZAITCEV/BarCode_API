import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import bcrypt from 'bcrypt'
import { InjectModel } from 'nestjs-typegoose';
import { AuthModel } from './auth.model';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {

	constructor(@InjectModel(AuthModel) private readonly authModel: ModelType<AuthModel>) { }


	async createUser(dto: CreateUserDto): Promise<DocumentType<AuthModel>> {
		const cost = 10;
		const hashPassword = bcrypt(dto.password, cost);
		const newUser = new this.authModel({
			login: dto.login,
			password: hashPassword
		})
		return newUser.save();
	}


	async findUser(login: string) {
		return this.authModel.findOne({ login }).exec();
	}


}
