import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { AuthModel } from './auth.model';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class AuthService {

	// constructor(@InjectModel(AuthModel) private readonly authModel: ModelType<AuthModel>) { }


	// async createUser(dto: CreateUserDto): Promise<DocumentType<AuthModel>> {
	// 	return this.authModel.create(dto);
	// }


}
