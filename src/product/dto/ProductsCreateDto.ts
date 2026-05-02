import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductsDto {
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
  name!: string;

  @IsNumber({}, { message: 'O preço deve ser um número válido' })
  @IsPositive({ message: 'O preço deve ser maior que zero' })
  @IsNotEmpty({ message: 'O preço é obrigatório' })
  @Type(() => Number)
  price!: number;

  @IsString({ message: 'A descrição tem que ser do tipo string' })
  @IsOptional()
  description?: string;

  @IsString({ message: 'A URL da imagem deve ser um texto' })
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsNotEmpty()
  id_category!: string;
}
