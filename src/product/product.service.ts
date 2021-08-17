import { Injectable } from '@nestjs/common';
import request from 'then-request';

@Injectable()
export class ProductService {

	async getProductByCode(code: string) {
		// console.log('code=', code)
		// console.log('typeof code=', typeof code)
		const fromApi = await request('GET', `https://world.openfoodfacts.org/api/v0/product/${code}.json`)
		return fromApi.body
	}

}
