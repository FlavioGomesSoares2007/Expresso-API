import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { StoresEntity } from '../stores/entities/Stores.Entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(StoresEntity)
    private readonly storesRepositorio: Repository<StoresEntity>,
  ) {}

  async login(password: string, email: string) {
    const store = await this.storesRepositorio.findOne({
      where: { email: email },
    });
    if (!store) {
      throw new UnauthorizedException('E-mail ou senha incorretos');
    }

    const checkPassword = await bcrypt.compare(password, store.password);

    if (!checkPassword) {
      throw new UnauthorizedException('E-mail ou senha incorretos');
    }

    const payload = {
      sub: store.id,
      email: store.email,
      nameStore: store.name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
