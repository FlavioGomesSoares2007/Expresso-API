import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entitie/OrderEntity';
import { OrderItemEntity } from './entitie/OrderItemEntity';
import { RevenueEntity } from '../revenue/entities/RevenueEntity';
import { StockModule } from '../stock/stock.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, RevenueEntity]),
    StockModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
