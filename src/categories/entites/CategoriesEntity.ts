import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from '../../products/entities/productEntity';
import { StoresEntity } from '../../stores/entities/Stores.Entity';

@Entity('categories')
export class CategoriesEntity {
  @PrimaryGeneratedColumn({ name: 'id_category' })
  id_category!: number;

  @Column()
  name!: string;

  @Column({ name: 'imageUrl', type: 'varchar', length: 255, nullable: true })
  imageUrl!: string;

  @Column({
    name: 'slug',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  slug!: string;

  @ManyToOne(() => StoresEntity, (store) => store.categories, {
    onDelete: 'CASCADE',
  })
  id_store!: StoresEntity;

  @OneToMany(() => ProductEntity, (prod) => prod.category)
  products!: ProductEntity[];
}
