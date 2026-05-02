import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { RevenueEntity } from './entities/RevenueEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { RevenueCreateDto } from './dto/RevenueCreateDto';
import { RevenueUpdateDto } from './dto/RevenueUpdateDto';

@Injectable()
export class RevenueService {
  constructor(
    @InjectRepository(RevenueEntity)
    private readonly revenueRepository: Repository<RevenueEntity>,
  ) {}

  async create(dados: RevenueCreateDto, id_store: string, id_product: string) {
    const revenue = await this.revenueRepository.findOne({
      where: {
        name: dados.name,
        store: { id_Store: id_store },
        product: { id_Product: id_product },
      },
    });
    if (revenue) {
      throw new ConflictException('Essa receita ja foi adicionada');
    }

    const newRevenue = this.revenueRepository.create({
      ...dados,
      product: { id_Product:id_product },
      store: { id_Store: id_store },
      stock: { id_stock: dados.id_stock },
    });
    return await this.revenueRepository.save(newRevenue);
  }
  async findAll(id_store: string) {
    return await this.revenueRepository.find({
      where: { store: { id_Store: id_store } },
    });
  }
  async findOne(id_Store: string, id_product: string) {
    return await this.revenueRepository.findOne({
      where: {
        store: { id_Store: id_Store },
        product: { id_Product: id_product },
      },
    });
  }
  async update(dados: RevenueUpdateDto, id_store: string, id_revenue: string) {
    const revenue = await this.revenueRepository.findOne({
      where: {
        store: { id_Store: id_store },
        id_revenue: id_revenue,
      },
    });

    if (!revenue) {
      throw new NotFoundException('Este item não está cadastrado');
    }

    Object.assign(revenue, dados);
    return await this.revenueRepository.save(revenue);
  }
  async delete(id_store: string, id_revenue: string) {
    const revenue = await this.revenueRepository.findOne({
      where: {
        store: { id_Store: id_store },
        id_revenue: id_revenue,
      },
    });

    if (!revenue) {
      throw new NotFoundException('essa receita não existe.');
    }
    await this.revenueRepository.remove(revenue);
    return { message: 'Item removido com sucesso.' };
  }
}
