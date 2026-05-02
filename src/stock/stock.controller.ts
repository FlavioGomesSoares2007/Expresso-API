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
import { StockService } from './stock.service';
import { AuthGuard } from '../auth/auth.guard';
import { StockCreateDto } from './dto/StockCreateDto';
import { StockUpdateDto } from './dto/StockUpdateDto';

@UseGuards(AuthGuard)
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  async create(@Body() dados: StockCreateDto, @Req() request) {
    return await this.stockService.create(dados, request.user.sub);
  }
  @Get()
  async findAll(@Req() request) {
    return await this.stockService.findAll(request.user.sub);
  }
  @Get(':id')
  async findOne(@Param('id',) id_stock: string, @Req() request) {
    return await this.stockService.findOne(request.user.sub, id_stock);
  }
  @Patch(':id')
  async update(
    @Body() dados: StockUpdateDto,
    @Req() requeste,
    @Param('id') id_stock: string,
  ) {
    return await this.stockService.update(dados, requeste.user.sub, id_stock);
  }
  @Delete(':id')
  async delete(@Param('id') id_stock: string, @Req() request) {
    return await this.stockService.delete(id_stock, request.user.sub);
  }
}
