import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { OrderEntity } from './OrderEntity';
import { ProductEntity } from '../../product/entities/productEntity';

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid',{name:'id_item'})
  id_item!: string;

  @ManyToOne(() => OrderEntity, (order) => order.items, { onDelete: 'CASCADE' })
  order!: OrderEntity;

  @ManyToOne(() => ProductEntity, (product)=>product.orders)
  @JoinColumn({name:'id_product'})
  product!: ProductEntity;

  @Column()
  quantity!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price_at_time!: number;
}