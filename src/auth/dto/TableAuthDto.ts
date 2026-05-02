import { IsNotEmpty, IsString } from 'class-validator';

export class TableAuthDto {
  @IsString({ message: 'O E-mail tem que ser uma string' })
  @IsNotEmpty({ message: 'O E-mail não pode ser nulo' })
  id_table!: string;

  @IsString({ message: 'A senha tem que ser uma string' })
  @IsNotEmpty({ message: 'A senha não pode ser nulo' })
  password!: string;
}
