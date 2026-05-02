import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryCreateDto } from './dto/CategoryCreateDto';
import { AuthGuard } from '../auth/auth.guard';
import { CategoryUpdateDto } from './dto/CategoryUpdateDto';

@UseGuards(AuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categorySevice: CategoriesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() dados: CategoryCreateDto,
    @Req() request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.categorySevice.create(dados, request.user.sub, file);
  }

  @Get()
  async findAll(@Req() request) {
    return await this.categorySevice.findAll(request.user.sub);
  }
  @Get(':id')
  async find(@Param('id') id_category: string, @Req() request) {
    return await this.categorySevice.find(id_category, request.user.sub);
  }
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Body() dados: CategoryUpdateDto,
    @Param('id') id_category: string,
    @Req() request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.categorySevice.update(
      dados,
      request.user.sub,
      id_category,
      file,
    );
  }
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req) {
    return await this.categorySevice.delete(id, req.user.sub);
  }
}
