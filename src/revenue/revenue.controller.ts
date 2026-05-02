import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { AuthGuard } from '../auth/auth.guard';
import { RevenueCreateDto } from './dto/RevenueCreateDto';
import { RevenueUpdateDto } from './dto/RevenueUpdateDto';

@UseGuards(AuthGuard)
@Controller('revenue')
export class RevenueController {
  constructor(private readonly revenueServices: RevenueService) {}

  @Post(':id')
  async create(
    @Body() dados: RevenueCreateDto,
    @Param('id') id_product: string,
    @Req() req,
  ) {
    return await this.revenueServices.create(dados, req.user.sub, id_product);
  }
  @Get()
  async findAll(@Req() req) {
    return await this.revenueServices.findAll(req.user.sub);
  }
  @Get(':id')
  async findOne(@Param('id') id_product: string, @Req() request) {
    return await this.revenueServices.findOne(request.user.sub, id_product);
  }
  @Patch(':id')
  async update(
    @Body() dados: RevenueUpdateDto,
    @Req() requeste,
    @Param('id') id_product: string,
  ) {
    return await this.revenueServices.update(
      dados,
      requeste.user.sub,
      id_product,
    );
  }
  @Delete(':id')
  async delete(@Param('id') id_product: string, @Req() request) {
    return await this.revenueServices.delete(id_product, request.user.sub);
  }
}
