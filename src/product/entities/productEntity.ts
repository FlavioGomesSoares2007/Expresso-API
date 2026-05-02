import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { StoresEntity } from '../../store/entities/StoresEntity';
import { CategoriesEntity } from '../../categorie/entities/CategoriesEntity';
import { RevenueEntity } from '../../revenue/entities/RevenueEntity';
import { OrderItemEntity } from '../../order/entitie/OrderItemEntity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id_Product' })
  id_Product!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Column({ name: 'imageUrl', type: 'varchar', length: 255, nullable: true })
  imageUrl?: string;

  @ManyToOne(() => StoresEntity, (store) => store.products, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'id_store' })
  id_store!: StoresEntity;

  @ManyToOne(() => CategoriesEntity, (category) => category.products, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'id_category' })
  id_category!: CategoriesEntity;

  @OneToMany(() => RevenueEntity, (revenue) => revenue.product)
  revenue!: RevenueEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => OrderItemEntity, (orders)=>orders.product)
  orders!: OrderItemEntity[];
}
