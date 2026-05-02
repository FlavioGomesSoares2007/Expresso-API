import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export enum TableStatus {
  FREE = 'free',
  OCCUPIED = 'occupied',
}

export class TablesCreateDto {
  @IsNumber()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  number!: number;

  @IsString({ message: 'O slug deve ser uma string' })
  @IsNotEmpty({ message: 'O slug é obrigatório' })
  @Matches(/^[a-z0-9-]+$/, {
    message: 'O slug deve conter apenas letras minúsculas, números e traços',
  })
  @MinLength(3, { message: 'O slug deve ter no mínimo 3 caracteres' })
  slug!: string;

  @IsOptional()
  @IsString({ message: 'A senha deve ser uma string' })
  @MinLength(6, {message:'A senha tem que ter no minimo 6 caracteris'})
  password?: string;

  @IsOptional()
  @IsEnum(TableStatus, { message: 'Status inválido' })
  status?: TableStatus = TableStatus.FREE;
}