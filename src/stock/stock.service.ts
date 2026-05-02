import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { StockEntity } from './entities/StockEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { StockCreateDto } from './dto/StockCreateDto';
import { StockUpdateDto } from './dto/StockUpdateDto';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(StockEntity)
    private readonly stockrepository: Repository<StockEntity>,
  ) {}

  async create(dados: StockCreateDto, id_store: string) {
    const findStock = await this.stockrepository.findOne({
      where: {
        name: dados.name,
        id_store: { id_Store: id_store },
      },
    });
    if (findStock) {
      throw new ConflictException('você ja cadastrou um intem com esse nome');
    }
    const newStore = this.stockrepository.create({
      ...dados,
      id_store: { id_Store: id_store },
    });
    return await this.stockrepository.save(newStore);
  }
  async findAll(id_Store: string) {
    return await this.stockrepository.find({
      where: { id_store: { id_Store: id_Store } },
      order: { name: 'ASC' },
    });
  }
  async findOne(id_Store: string, id_stock: string) {
    return await this.stockrepository.findOne({
      where: {
        id_store: { id_Store: id_Store },
        id_stock: id_stock,
      },
    });
  }
  async update(dados: StockUpdateDto, id_store: string, id_stock: string) {
    const stock = await this.stockrepository.findOne({
      where: {
        id_stock: id_stock,
        id_store: { id_Store: id_store },
      },
    });

    if (!stock) {
      throw new NotFoundException('Este item não está cadastrado');
    }

    Object.assign(stock, dados);
    return await this.stockrepository.save(stock);
  }
  async delete(id_stock: string, id_store: string) {
    const stock = await this.stockrepository.findOne({
      where: {
        id_stock: id_stock,
        id_store: { id_Store: id_store },
      },
    });

    if (!stock) {
      throw new NotFoundException(
        'Este item de estoque não existe ou não pertence à sua loja.',
      );
    }

    await this.stockrepository.remove(stock);

    return { message: 'Item removido com sucesso do estoque.' };
  }
  async decreaseStock(
    id_stock: string,
    id_store: string,
    unit: string,
    quantity: number,
    times: number,
  ) {
    const stock = await this.stockrepository.findOne({
      where: {
        id_stock: id_stock,
        id_store: { id_Store: id_store } as any,
      },
    });

    if (!stock) {
      throw new NotFoundException('Você não tem esse item no estoque');
    }

    let valueToReduce = 0;

    if (unit === 'un') {
      valueToReduce = quantity * times;
    } else if (unit === 'g' || unit === 'ml') {
      valueToReduce = (quantity / 1000) * times;
    }

    if (stock.quantity < valueToReduce) {
      throw new BadRequestException(`Estoque insuficiente para ${stock.name}.`);
    }

    stock.quantity -= valueToReduce;

    await this.stockrepository.save(stock);

    return {
      message: 'Baixa de estoque realizada!',
      newQuantity: stock.quantity,
    };
  }
  async increaseStock(
    id_stock: string,
    id_store: string,
    unit: string,
    quantity: number,
    times: number,
  ) {
    const stock = await this.stockrepository.findOne({
      where: {
        id_stock: id_stock,
        id_store: { id_Store: id_store } as any,
      },
    });

    if (!stock) {
      throw new NotFoundException('Você não tem esse item no estoque');
    }
    let valueToIncrease = 0;

    if (unit === 'un') {
      valueToIncrease = quantity * times;
    } else if (unit === 'g' || unit === 'ml') {
      valueToIncrease = (quantity / 1000) * times;
    }

    stock.quantity = Number(stock.quantity) + valueToIncrease;

  await this.stockrepository.save(stock);

    return {
     message: 'Incremento de estoque realizado!',
      newQuantity: stock.quantity,
    };
  }
}
