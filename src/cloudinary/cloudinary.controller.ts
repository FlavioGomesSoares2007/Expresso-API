import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async image(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Você precisa enviar uma imagem!');
    }
    try {
      const result = await this.cloudinaryService.uploadFile(file);

      return result;
    } catch (error) {
      throw new BadRequestException('Falha ao subir imagem para a nuvem.');
    }
  }
}
