import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaymentEntity } from './entities/PaymentEntity';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaymentCreateDto } from './dto/PaymentCreateDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async create(dados: PlaymentCreateDto, id_store: string) {
    const playment = await this.paymentRepository.findOne({
      where: {
        store: { id_Store: id_store },
      },
    });

    if (playment) {
      throw new ConflictException('Você já cadastrou seu token');
    }

    dados.access_token = await bcrypt.hash(dados.access_token, 10);

    const newPlayment = this.paymentRepository.create({
      ...dados,
      store: { id_Store: id_store },
    });

    await this.paymentRepository.save(newPlayment);
    return {
      message: 'Tokens salvos com sucesso!',
    };
  }
  async find(id_store: string) {
    return await this.paymentRepository.findOne({
      where: {
        store: { id_Store: id_store },
      },
    });
  }
  async update(id_store: string) {}
  async delete() {}
}
