import { IsNotEmpty, IsString } from 'class-validator';

export class PlaymentCreateDto {
  @IsString()
  @IsNotEmpty()
  access_token!: string;

  @IsString()
  @IsNotEmpty()
  public_key!: string;
}
