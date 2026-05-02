import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StoresEntity } from '../../store/entities/StoresEntity';
import { ProductEntity } from '../../product/entities/productEntity';
import { StockEntity } from '../../stock/entities/StockEntity';

@Entity('revenue')
export class RevenueEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id_revenue' })
  id_revenue!: string;

  @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
  name!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity!: number;

  @Column({
    name: 'unit',
    type: 'enum',
    enum: ['un', 'kg', 'g', 'l', 'ml', 'ft'],
    nullable: true,
  })
  unit!: string;

  @ManyToOne(() => StoresEntity, (store) => store.revenue)
  @JoinColumn({ name: 'id_store' })
  store!: StoresEntity;

  @ManyToOne(() => ProductEntity, (product) => product.revenue, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_product' })
  product!: ProductEntity;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => StockEntity, (stock) => stock.revenue)
  @JoinColumn({ name: 'id_stock' })
  stock!: StockEntity;
}
