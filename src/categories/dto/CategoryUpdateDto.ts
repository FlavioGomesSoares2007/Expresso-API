import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CategoryUpdateDto {
  @IsString({ message: 'O nome tem que ser do tipo string ' })
  @MinLength(3, { message: 'O nome tem que ter no minimo 3 letras' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'A URL da imagem deve ser um texto' })
  @IsOptional()
  imageUrl?: string;

  @IsString({ message: 'O slug deve ser uma string' })
  @IsOptional()
  @Matches(/^[a-z0-9-]+$/, {
    message: 'O slug deve conter apenas letras minúsculas, números e traços',
  })
  slug?: string;
}
