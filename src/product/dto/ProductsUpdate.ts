import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class ProductsUpdateDto {
  @IsString({ message: 'O nome deve ser um texto' })
  @IsOptional()
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
  name?: string;

  @IsNumber({}, { message: 'O preço deve ser um número válido' })
  @IsPositive({ message: 'O preço deve ser maior que zero' })
  @IsOptional()
  @Type(() => Number)
  price?: number;

  @IsString({ message: 'A descrição tem que ser do tipo string' })
  @IsOptional()
  description?: string;

  @IsString({ message: 'A URL da imagem deve ser um texto' })
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  id_category?: string;
}
