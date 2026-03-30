import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductsDto } from './dto/create-products';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly ProductRepositorio: Repository<ProductEntity>,
  ) {}

  async create(dados: CreateProductsDto) {
    const exists = await this.ProductRepositorio.findOne({
      where: { name: dados.name },
    });

    if (exists) {
      throw new ConflictException(
        `O produto "${dados.name}" já está cadastrado.`,
      );
    }

    const NewProduct = this.ProductRepositorio.create(dados);
    return await this.ProductRepositorio.save(NewProduct);
  }
}
