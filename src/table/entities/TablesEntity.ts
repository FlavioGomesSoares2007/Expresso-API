import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StoresEntity } from '../../store/entities/StoresEntity';
import { OrderEntity } from '../../order/entitie/OrderEntity';

@Entity('tables')
export class TablesEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id_table' })
  id_table!: string;

  @Column({
    name: 'number',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  number!: number;

  @Column({
    name: 'slug',
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  slug!: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  password!: string | null;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ['free', 'occupied'],
    default: 'free',
    nullable: false,
  })
  status!: string;

  @ManyToOne(() => StoresEntity, (store) => store.Tables)
  id_store!: StoresEntity;

}
