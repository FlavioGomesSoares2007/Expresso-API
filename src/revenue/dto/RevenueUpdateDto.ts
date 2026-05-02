import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export enum StockUnit {
  UNIDADE = 'un',
  QUILOGRAMA = 'kg',
  GRAMA = 'g',
  LITRO = 'l',
  MILILITRO = 'ml',
  FATIA = 'ft',
}

export class RevenueUpdateDto {
  @IsString({ message: 'O nome tem que ser um texto' })
  @IsOptional()
  @MinLength(3, { message: 'O nome tem que ter pelo menos 3 letras' })
  name?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  quantity?: number;

  @IsEnum(StockUnit, {
    message: 'Unidade inválida. Use: un, kg, g, ft, l ou ml',
  })
  @IsOptional()
  unit?: StockUnit;

  @IsString()
  @IsOptional()
  id_stock?:string
}
