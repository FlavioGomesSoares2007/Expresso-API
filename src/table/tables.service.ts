import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { TablesEntity } from './entities/TablesEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { TablesCreateDto } from './dto/TablesCreateDto';
import { TablesUpdateDto } from './dto/TablesUpdateDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(TablesEntity)
    private readonly tablesRepository: Repository<TablesEntity>,
  ) {}

  async create(dados: TablesCreateDto, id_store: string) {
    const table = await this.tablesRepository.findOne({
      where: { number: dados.number, id_store: { id_Store: id_store } as any },
    });
    if (table) {
      throw new ConflictException('Você já cadastrou uma mesa com esse nome');
    }
    const newTable = this.tablesRepository.create({
      ...dados,
      id_store: { id_Store: id_store } as any,
    });
    return await this.tablesRepository.save(newTable);
  }
  async findAll(id_store: string) {
    return await this.tablesRepository.find({
      where: { id_store: { id_Store: id_store } as any },
    });
  }
  async find(id_store: string, id_table: string) {
    return await this.tablesRepository.findOne({
      where: { id_table: id_table, id_store: { id_Store: id_store } as any },
    });
  }
  async update(dados: TablesUpdateDto, id_store: string, id_table: string) {
    const table = await this.tablesRepository.findOne({
      where: {
        id_table: id_table,
        id_store: { id_Store: id_store } as any,
      },
    });

    if (!table) {
      throw new NotFoundException('Essa mesa não existe.');
    }

    if (dados.password) {
      dados.password = await bcrypt.hash(dados.password, 10);
    }

    Object.assign(table, dados);

    if (table.status === 'free') {
      table.password = null;
    }
    if(dados.password){
      table.status = "occupied"
      table.password = dados.password
    }

    return await this.tablesRepository.save(table);
  }
  async delete(id_store: string, id_table: string) {
    const table = await this.tablesRepository.findOne({
      where: {
        id_table: id_table,
        id_store: { id_Store: id_store } as any,
      },
    });

    if (!table) {
      throw new NotFoundException('essa mesa não existe.');
    }

    await this.tablesRepository.remove(table);
    return { message: 'item apagado.' };
  }
}
