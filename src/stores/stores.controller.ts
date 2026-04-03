import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresDto } from './dto/StoresCreateDto';
import { AuthGuard } from '../auth/auth.guard';
import { StoresUpdateDto } from './dto/StoresUpdateDto';

@Controller('stores')
export class StoresController {
  constructor(private readonly StoresServices: StoresService) {}

  @Post()
  async create(@Body() dados: StoresDto) {
    return await this.StoresServices.create(dados);
  }

  @UseGuards(AuthGuard)
  @Get()
  async seeData(@Req() request) {
    return await this.StoresServices.seeData(request.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch()
  async update(@Body() dados: StoresUpdateDto, @Req() request) {
    return await this.StoresServices.update(dados, request.user.sub);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async delete(@Req() request) {
    return await this.StoresServices.delete(request.user.sub);
  }
}
