import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

	constructor(private readonly productService: ProductService) { }



	/**
 * Route /findProductByCode
 * only authenticated access to the route
 * return response of openfoodfacts.org
 * @param code code of the product to find in openfoodfacts.org
 * @returns Type.Object {acces_token: string}
 */
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get('findProductByCode/:code')
	async findProductByCode(@Param('code') code: string) {
		let res: string;
		const product = await this.productService.getProductByCode(code);
		if (typeof product !== 'string') {
			res = product.toString()
		} else {
			res = product
		}
		return JSON.parse(res)
	}
}
