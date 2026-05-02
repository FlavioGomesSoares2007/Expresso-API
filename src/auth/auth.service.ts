import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { StoresEntity } from '../store/entities/StoresEntity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { TablesEntity } from '../table/entities/TablesEntity';
import { AuthDto } from './dto/AuthDto';
import { TableAuthDto } from './dto/TableAuthDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(StoresEntity)
    private readonly storesRepositorio: Repository<StoresEntity>,
    @InjectRepository(TablesEntity)
    private readonly tableRepository: Repository<TablesEntity>,
  ) {}

  async login(dados: AuthDto) {
    const store = await this.storesRepositorio.findOne({
      where: { email: dados.email },
    });
    if (!store) {
      throw new UnauthorizedException('E-mail ou senha incorretos');
    }

    const checkPassword = await bcrypt.compare(dados.password, store.password);

    if (!checkPassword) {
      throw new UnauthorizedException('E-mail ou senha incorretos');
    }

    const payload = {
      sub: store.id_Store,
      email: store.email,
      nameStore: store.name,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async loginTable(dados: TableAuthDto) {
    const table = await this.tableRepository.findOne({
      where: { id_table: dados.id_table },
    });

    if (!table) {
      throw new UnauthorizedException('Mesa ou senha incorretos');
    }

    if (!table.password) {
      throw new UnauthorizedException('Essa mesa não está sendo ocupada');
    }

    const chackPassword = await bcrypt.compare(dados.password, table.password);

    if (!chackPassword) {
      throw new UnauthorizedException('Mesa ou senha incorretos');
    }

    const payload = {
      sub : table.id_table,
      numberTable: table.number
    }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
