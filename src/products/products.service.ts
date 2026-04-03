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
    const image = await this.cloudinaryService.uploadFile(file);
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

  async update(dados: ProductsUpdateDto, Id_Product: number, id_store: number) {
    const product = await this.productRepositorio.findOne({
      where: { id: Id_Product, id_store: { id: id_store } },
    });

    if (!product) {
      throw new UnauthorizedException('Pedido inexistente');
    }

    Object.assign(product, dados);
    return await this.productRepositorio.save(product);
  }

  async delete(id_product: number, id_store) {
    const stores = await this.productRepositorio.findOne({
      where: { id_store: { id: id_product }, id: id_product },
    });

    if (!stores) {
      throw new UnauthorizedException('Produto inexistente');
    }

    return await this.productRepositorio.remove(stores);
  }
}
