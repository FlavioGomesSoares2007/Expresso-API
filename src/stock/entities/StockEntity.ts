import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StoresEntity } from '../../store/entities/StoresEntity';
import { RevenueEntity } from '../../revenue/entities/RevenueEntity';

@Entity('stock')
export class StockEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id_stock' })
  id_stock!: string;

  @Column({ name: 'name', type: 'varchar', length: 100, nullable: true })
  name!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity!: number;

  @Column({
    name: 'unit',
    type: 'enum',
    enum: ['un', 'kg', 'g', 'l', 'ml', ],
    nullable: true,
  })
  unit!: string;

  @ManyToOne(() => StoresEntity, (stores) => stores.stock)
  @JoinColumn({ name: 'id_store' })
  id_store!: StoresEntity;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => RevenueEntity, (revenue) => revenue.stock)
  revenue!: RevenueEntity[];
}
