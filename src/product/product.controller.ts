import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

	constructor(private readonly productService: ProductService) { }

	@UseGuards(JwtAuthGuard)
	@Get('findProductByCode/:code')
	async findProductByCode(@Param('code') code: string) {
		let res: string;
		const product = await this.productService.getProductByCode(code);
		if (typeof product !== 'string') {
			res = product.toString()
			// console.log('response=', product.toString())
		} else {
			res = product
		}
		return JSON.parse(res)
	}
}
