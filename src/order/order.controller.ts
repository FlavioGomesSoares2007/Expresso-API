import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '../auth/auth.guard';
import { OrderCreateDto } from './dto/OrderCreateDto';

@UseGuards(AuthGuard)
@Controller('store/:id_store/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(
    @Body() dados: OrderCreateDto,
    @Req() req,
    @Param('id_store') id_store: string,
  ) {
    return await this.orderService.create(dados, req.user.sub, id_store);
  }
  @Get()
  async find(@Req() req, @Param('id_store') id_store: string) {
    return await this.orderService.find(req.user.sub, id_store);
  }
  @Delete(':id')
  async delete(
    @Param('id') id_item: string,
  ) {
    return await this.orderService.delete(id_item,);
  }
}
