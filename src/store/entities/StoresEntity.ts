import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from '../../product/entities/productEntity';
import { CategoriesEntity } from '../../categorie/entities/CategoriesEntity';
import { StockEntity } from '../../stock/entities/StockEntity';
import { RevenueEntity } from '../../revenue/entities/RevenueEntity';
import { TablesEntity } from '../../table/entities/TablesEntity';
import { PaymentEntity } from '../../payment/entities/PaymentEntity';

@Entity('stores')
export class StoresEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id_Store' })
  id_Store!: string;

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

  @OneToMany(() => RevenueEntity, (revenue) => revenue.store)
  revenue!: RevenueEntity[];

  @OneToMany(() => StockEntity, (stock) => stock.id_stock)
  stock!: StockEntity[];

  @OneToMany(() => TablesEntity, (table) => table.id_store)
  Tables!: TablesEntity[];

  @OneToOne(() => PaymentEntity, (payment) => payment.id_payment)
  payment!: PaymentEntity;
}
