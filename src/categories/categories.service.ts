import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoriesEntity } from './entites/CategoriesEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryCreateDto } from './dto/CategoryCreateDto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CategoryUpdateDto } from './dto/CategoryUpdateDto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepositorio: Repository<CategoriesEntity>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    dados: CategoryCreateDto,
    id_store: number,
    file: Express.Multer.File,
  ) {
    const category = await this.categoriesRepositorio.findOne({
      where: {
        id_store: { id: id_store },
        name: dados.name,
      },
    });

    if (category) {
      throw new ConflictException(
        'você já cadastrou uma categoria com esse nome',
      );
    }

    if (file) {
      const image = await this.cloudinaryService.uploadFile(
        file,
        'category',
        500,
        500,
      );
      dados.imageUrl = image.secure_url;
    }

    const newCategory = this.categoriesRepositorio.create({
      ...dados,
      id_store: { id: id_store },
    });
    return await this.categoriesRepositorio.save(newCategory);
  }
  async findAll(id_store: number) {
    return await this.categoriesRepositorio.find({
      where: {
        id_store: { id: id_store },
      },
    });
  }
  async find(id_category: number, id_store: number) {
    return await this.categoriesRepositorio.findOne({
      where: {
        id_category: id_category,
        id_store: { id: id_store },
      },
    });
  }
  async update(
    dados: CategoryUpdateDto,
    id_store: number,
    id_category: number,
    file?: Express.Multer.File,
  ) {
    const category = await this.categoriesRepositorio.findOne({
      where: {
        id_category: id_category,
        id_store: { id: id_store },
      },
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada.');
    }

    if (file) {
      if (category.imageUrl) {
        const oldPublicId = this.cloudinaryService.extractPublicId(
          category.imageUrl,
        );
        await this.cloudinaryService.deleteFile(oldPublicId);
        const image = await this.cloudinaryService.uploadFile(
          file,
          'category',
          500,
          500,
        );
        dados.imageUrl = image.secure_url;
      }
    }

    Object.assign(category, dados);
    return await this.categoriesRepositorio.save(category);
  }
  async delete(id_category: number, id_store: number) {
    const category = await this.categoriesRepositorio.findOne({
      where: {
        id_category: id_category,
        id_store: { id: id_store },
      },
      relations: ['products'],
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada.');
    }

    if (category.products && category.products.length > 0) {
      const deleteProductsImagesPromises = category.products
        .filter((product) => !!product.imageUrl)
        .map((product) => {
          const publicId = this.cloudinaryService.extractPublicId(
            product.imageUrl!,
          );
          return this.cloudinaryService.deleteFile(publicId);
        });

      await Promise.all(deleteProductsImagesPromises).catch((err) =>
        console.error('Erro ao deletar imagens dos produtos:', err),
      );
    }

    if (category.imageUrl) {
      try {
        const categoryPublicId = this.cloudinaryService.extractPublicId(
          category.imageUrl,
        );
        await this.cloudinaryService.deleteFile(categoryPublicId);
      } catch (error) {
        console.error('Erro ao deletar imagem da categoria:', error);
      }
    }

    return await this.categoriesRepositorio.remove(category);
  }
}
