import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StoresEntity } from '../../store/entities/StoresEntity';

@Entity('payment_configs')
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id_payment' })
  id_payment!: string;

  @Column({ name: 'access_token', type: 'text', nullable: true, select: false })
  mercadopago_access_token!: string;

  @Column({ name: 'public_key', type: 'text', nullable: true })
  mercadopago_public_key!: string;

  @OneToOne(() => StoresEntity, (store) => store.payment)
  @JoinColumn({ name: 'id_store' })
  store!: StoresEntity;

  @UpdateDateColumn()
  updated_at!: Date;
}
