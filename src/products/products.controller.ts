import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Put,} from '@nestjs/common';
import {Product} from './product.interface';
import {ProductsService} from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  async getAllProducts() {
    return await this.productsService.getAllProducts();
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    return await this.productsService.getProductById(id);
  }

  @Put('set-product')
  async createProduct(@Body() product: Partial<Product>) {
    console.log(product);
    if (product.id) {
      return await this.productsService.updateProduct(product);
    } else {
      return await this.productsService.createProduct(product);
    }
  }

  @Delete('delete-product/:id')
  async deleteProduct(@Param('id') id: string) {
    try {
      return await this.productsService.deleteProduct(id);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Product not found',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
