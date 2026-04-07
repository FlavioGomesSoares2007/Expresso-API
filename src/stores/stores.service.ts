import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { StoresEntity } from './entities/Stores.Entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StoresDto } from './dto/StoresCreateDto';
import * as bcrypt from 'bcrypt';
import { StoresUpdateDto } from './dto/StoresUpdateDto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(StoresEntity)
    private readonly storesRepositorio: Repository<StoresEntity>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

async create(dados: StoresDto, file?: Express.Multer.File) {
  const exists = await this.storesRepositorio.findOne({
    where: [
      { slug: dados.slug },
      { email: dados.email },
      { name: dados.name },
    ],
  });

  if (exists) {
    if (exists.name === dados.name) throw new ConflictException('Nome já cadastrado');
    if (exists.email === dados.email) throw new ConflictException('E-mail já cadastrado');
    if (exists.slug === dados.slug) throw new ConflictException('Slug já cadastrado');
  }

  if (file) {
    const image = await this.cloudinaryService.uploadFile(file, 'stores');
    dados.logoUrl = image.secure_url;
  }

  const hashedPassword = await bcrypt.hash(dados.password, 10);

  const newStore = this.storesRepositorio.create({
    ...dados,
    password: hashedPassword,
  });

  await this.storesRepositorio.save(newStore);

  const { password, ...data } = newStore;
  return {
    store: data,
  };
}

  async seeData(id: number) {
    return await this.storesRepositorio.findOne({
      where: { id: id },
      relations: ['products'],
    });
  }

  async update(dados: StoresUpdateDto, id: number, file?: Express.Multer.File) {
    const store = await this.storesRepositorio.findOne({
      where: { id: id },
    });

    if (!store) {
      throw new NotFoundException('Loja inexistente');
    }

    if (dados.password) {
      dados.password = await bcrypt.hash(dados.password, 10);
    }

    if (file) {
      if (store.logoUrl) {
        const publicId = this.cloudinaryService.extractPublicId(store.logoUrl);
        await this.cloudinaryService.deleteFile(publicId);
      }

      const image = await this.cloudinaryService.uploadFile(file, 'store');
      dados.logoUrl = image.secure_url;
    }

    Object.assign(store, dados);
    await this.storesRepositorio.save(store);
    const { password, ...data } = store;

    return {
      store: data,
    };
  }

  async delete(id_store: number) {
  const store = await this.storesRepositorio.findOne({
    where: { id: id_store },
    relations: ['products'], 
  });

  if (!store) throw new NotFoundException('Loja não encontrada');

  if (store.products && store.products.length > 0) {
    const deletePromises = store.products.map(async (product) => {
      if (product.imageUrl) {
        const publicId = this.cloudinaryService.extractPublicId(product.imageUrl);
        return this.cloudinaryService.deleteFile(publicId);
      }
    });
    await Promise.all(deletePromises);
  }

  if (store.logoUrl) {
    const logoId = this.cloudinaryService.extractPublicId(store.logoUrl);
    await this.cloudinaryService.deleteFile(logoId);
  }

  return await this.storesRepositorio.remove(store);
}
  }

