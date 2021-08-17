import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

	constructor(private readonly productService: ProductService) { }

	// @UseGuards()
	@Get('findProductByCode/:code')
	async findProductByCode(@Param('code') code: string) {
		const product = await this.productService.getProductByCode(code);
		if (typeof product !== 'string') {
			console.log('response=', product.toString())
		}
		return product.toString()
	}
}
