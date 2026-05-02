import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entitie/OrderEntity';
import { OrderItemEntity } from './entitie/OrderItemEntity';
import { OrderCreateDto } from './dto/OrderCreateDto';
import { RevenueEntity } from '../revenue/entities/RevenueEntity';
import { StockService } from '../stock/stock.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
    @InjectRepository(RevenueEntity)
    private readonly revenueRepository: Repository<RevenueEntity>,
    private readonly stockService: StockService,
  ) {}

  async create(dados: OrderCreateDto, id_table: string, id_store: string) {
    try {
      const order = await this.orderRepository.findOne({
        where: {
          id_table: id_table as any,
          id_store: { id_Store: id_store },
          is_paid: false,
        },
      });

      if (!order) {
        const newOrder = this.orderRepository.create({
          total_price: 0,
          id_store: { id_Store: id_store },
          id_table: { id_table: id_table },
        });
        const orderSav = await this.orderRepository.save(newOrder);

        let priceEnd = 0;

        for (const items of dados.items) {
          const revenue = await this.revenueRepository.find({
            where: {
              product: { id_Product: items.id_product },
              store: { id_Store: id_store },
            },
            relations: ['stock', 'product'],
          });
          if (!revenue) {
            throw new NotFoundException(
              `Receita para o produto não encontrada.`,
            );
          }
          const newOrderItems = this.orderItemRepository.create({
            order: { id_order: orderSav.id_order },
            product: { id_Product: items.id_product },
            price_at_time: revenue[0].product.price,
            quantity: items.quantity,
          });

          for (const low of revenue) {
            this.stockService.decreaseStock(
              low.stock.id_stock,
              id_store,
              low.unit,
              low.quantity,
              items.quantity,
            );
          }

          priceEnd += revenue[0].product.price * items.quantity;

          orderSav.total_price = priceEnd;

          await this.orderRepository.save(orderSav);

          await this.orderItemRepository.save(newOrderItems);
        }

        return {
          message: 'Pedido realizado com sucesso!',
          orderId: orderSav.id_order,
          total: priceEnd,
        };
      }
      if (order) {
        let priceEnd = Number(order.total_price);

        for (const items of dados.items) {
          const revenue = await this.revenueRepository.find({
            where: {
              product: { id_Product: items.id_product },
              store: { id_Store: id_store },
            },
            relations: ['stock', 'product'],
          });

          if (!revenue) {
            throw new NotFoundException(
              `Receita para o produto não encontrada.`,
            );
          }
          const newOrderItems = this.orderItemRepository.create({
            order: { id_order: order.id_order },
            product: { id_Product: items.id_product },
            price_at_time: revenue[0].product.price,
            quantity: items.quantity,
          });

          for (const low of revenue) {
            this.stockService.decreaseStock(
              low.stock.id_stock,
              id_store,
              low.unit,
              low.quantity,
              items.quantity,
            );
          }

          priceEnd += revenue[0].product.price * items.quantity;

          order.total_price = priceEnd;

          await this.orderRepository.save(order);

          await this.orderItemRepository.save(newOrderItems);
        }

        return {
          message: 'Pedido realizado com sucesso!',
          orderId: order.id_order,
          total: priceEnd,
        };
      }
    } catch (error) {
      return {
        mensage: `erro: ${error}`,
      };
    }
  }
  async find(id_table: string, id_store: string) {
    return await this.orderRepository.find({
      where: {
        id_table: id_table as any,
        id_store: { id_Store: id_store },
        is_paid: false,
      },
      relations: ['items'],
    });
  }
  async delete(id_item: string) {
    const item = await this.orderItemRepository.findOne({
      where: {
        id_item: id_item,
      },
      relations: ['product', 'order'],
    });

    if (!item) {
      throw new NotFoundException('item não encontrado.');
    }

    const revenue = await this.revenueRepository.find({
      where: {
        product: { id_Product: item.product.id_Product },
      },
      relations: ['stock', 'store'],
    });
    for (const increase of revenue) {
      this.stockService.increaseStock(
        increase.stock.id_stock,
        increase.store.id_Store,
        increase.unit,
        Number(increase.quantity),
        item.quantity,
      );
    }

    const order = await this.orderRepository.findOne({
      where: {
        id_order: item.order.id_order,
        is_paid: false,
      },
    });

    if (!order) {
      throw new NotFoundException('Esse pedido não existe');
    }

    order.total_price -= item.price_at_time;
    await this.orderRepository.save(order);
    await this.orderItemRepository.remove(item);

    return {
      message: 'Item apagado com sucesso!',
    };
  }
}
