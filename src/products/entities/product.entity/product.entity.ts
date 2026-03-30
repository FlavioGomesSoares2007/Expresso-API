import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn({ name: 'Id_Products' })
  id!: number;

  @Column({ name: 'name', type: 'varchar', length: 100, nullable: false, unique: true })
  name!: string;

  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
  price!: number;
}
