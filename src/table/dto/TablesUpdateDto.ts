import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TableStatus } from './TablesCreateDto';

export class TablesUpdateDto {
  @IsOptional()
  @IsNumber()
  number?: number;

  @IsOptional()
  @IsString({ message: 'O slug deve ser uma string' })
  @Matches(/^[a-z0-9-]+$/, {
    message: 'O slug deve conter apenas letras minúsculas, números e traços',
  })
  @MinLength(3, { message: 'O slug deve ter no mínimo 3 caracteres' })
  slug?: string;

  @IsOptional()
  @IsString({ message: 'A senha deve ser uma string' })
  @MinLength(6, { message: 'A senha tem que ter no minimo 6 caracteris' })
  password?: string;

  @IsOptional()
  @IsEnum(TableStatus, { message: 'Status inválido' })
  status?: TableStatus;
}
