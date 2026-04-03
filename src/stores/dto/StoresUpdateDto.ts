import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class StoresUpdateDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'O e-mail informado é inválido' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'A senha tem que ser uma string' })
  password?: string;

  @IsOptional()
  @IsString({ message: 'O slug deve ser uma string' })
  @Matches(/^[a-z0-9-]+$/, {
    message: 'O slug deve conter apenas letras minúsculas, números e traços',
  })
  slug?: string;

  @IsOptional()
  @Length(11, 11, { message: 'O CPF deve ter exatamente 11 dígitos' })
  cpf?: string;
}

