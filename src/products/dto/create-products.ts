import {
  IsNotEmpty,
  IsNumber,
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
  price!: number;
}
