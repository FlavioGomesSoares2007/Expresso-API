import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/productEntity';
import { Repository } from 'typeorm';
import { CreateProductsDto } from './dto/ProductsCreateDto';
import { ProductsUpdateDto } from './dto/ProductsUpdate';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepositorio: Repository<ProductEntity>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    dados: CreateProductsDto,
    id: number,
    file: Express.Multer.File,
  ) {
    const image = await this.cloudinaryService.uploadFile(
      file,
      'product',
      500,
      500,
    );
    const exists = await this.productRepositorio.findOne({
      where: { name: dados.name, id_store: { id: id } },
    });

    if (exists) {
      throw new ConflictException(
        'O produto "' + dados.name + '" já está cadastrado.',
      );
    }

    const NewProduct = this.productRepositorio.create({
      ...dados,
      id_store: { id: id },
      imageUrl: image.secure_url,
    });
    return await this.productRepositorio.save(NewProduct);
  }

  async findAll(id: number) {
    return await this.productRepositorio.findOne({
      where: { id_store: { id: id } },
    });
  }

  async find(id: number, id_store: number) {
    return await this.productRepositorio.findOne({
      where: { id: id, id_store: { id: id_store } },
    });
  }

  async update(
    id_product: number,
    id_store: number,
    dados: ProductsUpdateDto,
    file?: Express.Multer.File,
  ) {
    const product = await this.productRepositorio.findOne({
      where: { id: id_product, id_store: { id: id_store } },
    });

    if (!product) {
      throw new UnauthorizedException('Produto não encontrado nesta loja');
    }

    if (file) {
      if (product.imageUrl) {
        const publicId = this.cloudinaryService.extractPublicId(
          product.imageUrl,
        );
        await this.cloudinaryService.deleteFile(publicId);
      }

      const image = await this.cloudinaryService.uploadFile(
        file,
        'product',
        500,
        500,
      );
      dados.imageUrl = image.secure_url;
    }

    Object.assign(product, dados);
    return await this.productRepositorio.save(product);
  }

  async delete(id_product: number, id_store: number) {
    const stores = await this.productRepositorio.findOne({
      where: { id_store: { id: id_store }, id: id_product },
    });

    if (!stores) {
      throw new UnauthorizedException('Produto inexistente');
    }
    if (stores.imageUrl) {
      const publicId = this.cloudinaryService.extractPublicId(stores.imageUrl);
      await this.cloudinaryService.deleteFile(publicId);
    }

    return await this.productRepositorio.remove(stores);
  }
}
