import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresEntity } from './entities/Stores.Entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoresEntity])],
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}
