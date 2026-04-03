import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { StoresEntity } from './entities/Stores.Entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StoresDto } from './dto/StoresCreateDto';
import * as bcrypt from 'bcrypt';
import { StoresUpdateDto } from './dto/StoresUpdateDto';
@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(StoresEntity)
    private readonly StoresRepositorio: Repository<StoresEntity>,
  ) {}

  async create(dados: StoresDto) {
    const exists = await this.StoresRepositorio.findOne({
      where: [
        { slug: dados.slug },
        { email: dados.email },
        { name: dados.name },
      ],
    });

    if (exists) {
      if (exists.name === dados.name) {
        throw new ConflictException(
          'Já existe uma loja cadastrada com este nome',
        );
      }
      if (exists.email === dados.email) {
        throw new ConflictException(
          'Já existe uma loja cadastrada com este e-mail',
        );
      }

      if (exists.slug === dados.slug) {
        throw new ConflictException(
          'Já existe uma loja cadastrada com este slug (URL)',
        );
      }
    }

    const hashedPassword = await bcrypt.hash(dados.password, 10);

    const newStore = this.StoresRepositorio.create({
      ...dados,
      password: hashedPassword,
    });
    await this.StoresRepositorio.save(newStore);
    const { password, ...data } = newStore;
    return {
      newStore: data,
    };
  }

  async seeData(id: number) {
    return await this.StoresRepositorio.findOne({
      where: { id: id },
      relations: ['products'],
    });
  }

  async update(dados: StoresUpdateDto, id: number) {
    const store = await this.StoresRepositorio.findOne({
      where: { id: id },
    });

    if (!store) {
      throw new NotFoundException('Loja inexistente');
    }

    if (dados.password) {
      dados.password = await bcrypt.hash(dados.password, 10);
    }

    Object.assign(store, dados);
    await this.StoresRepositorio.save(store);
    const { password, ...data } = store;

    return {
      store: data,
    };
  }

  async delete(id: number) {
    return await this.StoresRepositorio.delete(id);
  }
}
