import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/create-products';

@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}

  @Post()
  async create(@Body() dados: CreateProductsDto) {
    return await this.ProductsService.create(dados);
  }

  @Get()
  async findAll() {
    return await this.ProductsService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    return await this.ProductsService.find(id);
  }
}
