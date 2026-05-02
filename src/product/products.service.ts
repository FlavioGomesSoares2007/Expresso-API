import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/productEntity';
import { Repository } from 'typeorm';
import { CreateProductsDto } from './dto/ProductsCreateDto';
import { ProductsUpdateDto } from './dto/ProductsUpdate';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CategoriesEntity } from '../categorie/entities/CategoriesEntity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepositorio: Repository<ProductEntity>,
    @InjectRepository(CategoriesEntity)
    private readonly categoryRepositorio: Repository<CategoriesEntity>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    dados: CreateProductsDto,
    id_store: string,
    file: Express.Multer.File,
  ) {
    const myCategory = await this.categoryRepositorio.findOne({
      where: {
        id_category: dados.id_category,
        id_store: { id_Store: id_store },
      },
    });

    if (!myCategory) {
      throw new ForbiddenException(
        'Esta categoria não existe ou não pertence à sua loja.',
      );
    }

    const exists = await this.productRepositorio.findOne({
      where: { name: dados.name, id_store: { id_Store: id_store } },
    });

    if (exists) {
      throw new ConflictException(
        `O produto "${dados.name}" já está cadastrado.`,
      );
    }

    const image = await this.cloudinaryService.uploadFile(
      file,
      'product',
      500,
      500,
    );

    const newProduct = this.productRepositorio.create({
      ...dados,
      imageUrl: image.secure_url,
      id_store: { id_Store: id_store } as any,
      id_category: { id_category: dados.id_category } as any,
    });

    return await this.productRepositorio.save(newProduct);
  }
  async findAll(id_store: string) {
    return await this.productRepositorio.find({
      where: { id_store: { id_Store: id_store } },
      relations: ['id_category'],
    });
  }
  async find(id: string, id_store: string) {
    const product = await this.productRepositorio.findOne({
      where: { id_Product: id, id_store: { id_Store: id_store } },
      relations: ['id_category'],
    });

    if (!product) throw new NotFoundException('Produto não encontrado.');
    return product;
  }
  async update(
    id_product: string,
    id_store: string,
    dados: ProductsUpdateDto,
    file?: Express.Multer.File,
  ) {
    const product = await this.productRepositorio.findOne({
      where: { id_Product: id_product, id_store: { id_Store: id_store } },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado nesta loja.');
    }

    if (dados.id_category) {
      const catExists = await this.categoryRepositorio.findOne({
        where: { id_category: dados.id_category, id_store: { id_Store: id_store } },
      });
      if (!catExists)
        throw new ForbiddenException('Categoria destino inválida.');

      product.id_category = {
        id_category: dados.id_category,
      } as CategoriesEntity;
      delete dados.id_category;
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
      product.imageUrl = image.secure_url;
    }

    Object.assign(product, dados);
    return await this.productRepositorio.save(product);
  }
  async delete(id_product: string, id_store: string) {
    const product = await this.productRepositorio.findOne({
      where: { id_Product: id_product, id_store: { id_Store: id_store } },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado.');
    }

    if (product.imageUrl) {
      const publicId = this.cloudinaryService.extractPublicId(product.imageUrl);
      await this.cloudinaryService.deleteFile(publicId);
    }

    return await this.productRepositorio.remove(product);
  }
}
