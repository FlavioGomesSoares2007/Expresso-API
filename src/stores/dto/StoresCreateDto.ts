import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class StoresDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome da loja é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  name!: string;

  @IsEmail({}, { message: 'O e-mail informado é inválido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email!: string;

  @IsString({ message: 'A senha tem que ser uma string' })
  @IsNotEmpty({ message: 'A senha é obrigatoria ' })
  @MinLength(3, { message: 'A senha deve ter no mínimo 3 caracteres' })
  password!: string;

  @IsString({ message: 'O slug deve ser uma string' })
  @IsNotEmpty({ message: 'O slug é obrigatório' })
  @Matches(/^[a-z0-9-]+$/, {
    message: 'O slug deve conter apenas letras minúsculas, números e traços',
  })
  @MinLength(3, { message: 'O slug deve ter no mínimo 3 caracteres' })
  slug!: string;

  @IsString({ message: 'A URL da imagem deve ser um texto' })
  @IsOptional()
  logoUrl?: string;
}
