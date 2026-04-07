import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class StoresUpdateDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'O e-mail informado é inválido' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'A senha tem que ser uma string' })
  @MinLength(3, { message: 'A senha deve ter no mínimo 3 caracteres' })
  password?: string;

  @IsOptional()
  @IsString({ message: 'O slug deve ser uma string' })
  @Matches(/^[a-z0-9-]+$/, {
    message: 'O slug deve conter apenas letras minúsculas, números e traços',
  })
  @MinLength(3, { message: 'O slug deve ter no mínimo 3 caracteres' })
  slug?: string;

  @IsOptional()
  @Length(11, 11, { message: 'O CPF deve ter exatamente 11 dígitos' })
  cpf?: string;

  @IsString({ message: 'A URL da imagem deve ser um texto' })
  @IsOptional()
  logoUrl?: string;
}
