import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class OrderItemCreateDto {
  @IsString()
  @IsNotEmpty()
  id_product!: string;

  @IsInt()
  @IsNotEmpty()
  quantity!: number;

}
