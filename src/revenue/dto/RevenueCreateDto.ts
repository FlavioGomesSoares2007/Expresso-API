import { IsEnum, IsNotEmpty, IsNumber, IsString, Min, MinLength } from 'class-validator';

export enum StockUnit {
  UNIDADE = 'un',
  QUILOGRAMA = 'kg',
  GRAMA = 'g',
  LITRO = 'l',
  MILILITRO = 'ml',
  FATIA = 'ft',
}

export class RevenueCreateDto {
  @IsString({ message: 'O nome tem que ser um texto' })
  @IsNotEmpty({ message: 'O nome é obrigatorio' })
  @MinLength(3, { message: 'O nome tem que ter pelo menos 3 letras' })
  name!: string;

   @IsNumber()
    @Min(0)
    @IsNotEmpty({ message: 'A quantidade inicial deve ser informada.' })
    quantity!: number;

  @IsEnum(StockUnit, {
    message: 'Unidade inválida. Use: un, kg, g, ft, l ou ml',
  })
  @IsNotEmpty({ message: 'A unidade é obrigatorio' })
  unit!: StockUnit;

  @IsString()
  @IsNotEmpty()
  id_stock!:string
}
