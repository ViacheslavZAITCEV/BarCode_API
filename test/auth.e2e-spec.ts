import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose';
import { UserDto } from 'src/auth/dto/user.dto';

// const productId = new Types.ObjectId().toHexString();

const testDto: UserDto = {
	login: 'loginTest',
	password: 'passwordTest'
}

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/test (GET)', async () => {
		return request(app.getHttpServer())
			.get('/auth/test')
			.expect(200);
		// done();
	});


	it('/review/create (POST)', async () => {
		return request(app.getHttpServer())
			.post('/auth/create')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id
				expect(createdId).toBeDefined();
			});
	});

	it('/review/login (POST)', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(testDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body).toBe(testDto);
			});
	});

	afterAll(() => {
		disconnect();
	})

})
