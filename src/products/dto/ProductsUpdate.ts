import {
  IsNotEmpty,
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
  price?: number;

  @IsString({ message: 'A descrição tem que ser do tipo string' })
  @IsOptional()
  description?: string;
}
