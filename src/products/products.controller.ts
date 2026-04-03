import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/ProductsCreateDto';
import { AuthGuard } from '../auth/auth.guard';
import { ProductsUpdateDto } from './dto/ProductsUpdate';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() dados: CreateProductsDto,
    @Req() request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.productsService.create(dados, request.user.sub, file);
  }

  @Get()
  async findAll(@Req() request) {
    return await this.productsService.findAll(request.user.sub);
  }

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number, @Req() request) {
    return await this.productsService.find(id, request.user.sub);
  }

  @Patch(':id')
  async update(
    @Body() dados: ProductsUpdateDto,
    @Param('id', ParseIntPipe) id_product: number,
    @Req() request,
  ) {
    return await this.productsService.update(
      dados,
      id_product,
      request.user.sub,
    );
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Req() requeste) {
    return await this.productsService.delete(id, requeste.user.sub);
  }
}
