import { IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class CategoryCreateDto {
  @IsString({ message: 'O nome tem que ser do tipo string ' })
  @IsNotEmpty({ message: 'O nome é obrigatorio' })
  @MinLength(3, { message: 'O nome tem que ter no minimo 3 letras' })
  name!: string;

  @IsString({ message: 'A URL da imagem deve ser um texto' })
  @IsOptional()
  imageUrl?: string;

  @IsString({ message: 'O slug deve ser uma string' })
  @IsNotEmpty({ message: 'O slug é obrigatório' })
  @Matches(/^[a-z0-9-]+$/, {
    message: 'O slug deve conter apenas letras minúsculas, números e traços',
  })
  slug!: string;
}
