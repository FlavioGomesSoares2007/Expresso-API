import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from '../../products/entities/productEntity';
import { CategoriesEntity } from '../../categories/entites/CategoriesEntity';

@Entity('stores')
export class StoresEntity {
  @PrimaryGeneratedColumn({ name: 'id_Store' })
  id!: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  name!: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 150,
    unique: true,
    nullable: false,
  })
  email!: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  password!: string;

  @Column({
    name: 'slug',
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  slug!: string;

  @Column({ name: 'imageUrl', type: 'varchar', length: 255, nullable: true })
  logoUrl?: string;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => ProductEntity, (products) => products.id_store)
  products!: ProductEntity[];

  @OneToMany(() => CategoriesEntity, (category) => category.id_store)
  categories!: CategoriesEntity[];
}
