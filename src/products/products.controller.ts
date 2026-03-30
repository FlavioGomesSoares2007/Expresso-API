import { Body, Controller, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/create-products';

@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Post()
  async create(@Body() dados: CreateProductsDto) {
    return await this.ProductsService.create(dados);
  }
}
