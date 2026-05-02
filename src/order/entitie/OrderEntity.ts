import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { StoresEntity } from '../../store/entities/StoresEntity';
import { TablesEntity } from '../../table/entities/TablesEntity';
import { OrderItemEntity } from './OrderItemEntity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid', {name:'id_order'})
  id_order!: string;

  @ManyToOne(() => StoresEntity)
  id_store!: StoresEntity;

  @ManyToOne(() => TablesEntity)
  @JoinColumn({name:'id_table'})
  id_table!: TablesEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_price!: number;

  @Column({ type: 'boolean', default: false })
  is_paid!: boolean

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true })
  items!: OrderItemEntity[];
}