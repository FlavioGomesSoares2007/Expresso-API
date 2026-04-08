import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { StoresEntity } from '../../stores/entities/Stores.Entity';
import { CategoriesEntity } from '../../categories/entites/CategoriesEntity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn({ name: 'id_Product' })
  id!: number;

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
  category!: CategoriesEntity;

  @CreateDateColumn()
  createdAt!: Date;
}
