import { IsArray, ValidateNested, } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemCreateDto } from './OrderItemCreateDto';

export class OrderCreateDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemCreateDto)
  items!: OrderItemCreateDto[];
}