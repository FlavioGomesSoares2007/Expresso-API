import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './product/products.module';
import { StoresModule } from './store/stores.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CategoriesModule } from './categorie/categories.module';
import { StockModule } from './stock/stock.module';
import { RevenueModule } from './revenue/revenue.module';
import { TablesModule } from './table/tables.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { SecurityModule } from './security/security.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    StoresModule,
    ProductsModule,
    AuthModule,
    CloudinaryModule,
    CategoriesModule,
    StockModule,
    RevenueModule,
    TablesModule,
    OrderModule,
    PaymentModule,
    SecurityModule,
  ],
})
export class AppModule {}
