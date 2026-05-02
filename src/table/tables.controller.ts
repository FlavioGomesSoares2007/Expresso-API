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
  UseGuards,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { AuthGuard } from '../auth/auth.guard';
import { TablesCreateDto } from './dto/TablesCreateDto';
import { TablesUpdateDto } from './dto/TablesUpdateDto';

@Controller('store/:id_store/tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  async create(
    @Body() dados: TablesCreateDto,
    @Param('id_store') id_store: string,
  ) {
    return await this.tablesService.create(dados, id_store);
  }
  @Get()
  async findAll(@Param('id_store') id_store: string) {
    return await this.tablesService.findAll(id_store);
  }
  @Get(':id')
  async findOne(
    @Param('id') id_table: string,
    @Param('id_store') id_store: string,
  ) {
    return await this.tablesService.find(id_store, id_table);
  }
  @Patch(':id_table')
  async update(
    @Body() dados: TablesUpdateDto,
    @Req() request,
    @Param('id_table') id_table: string,
    @Param('id_store') id_store: string,
  ) {
    return await this.tablesService.update(dados, id_store, id_table);
  }
  @Delete(':id')
  async delete(
    @Param('id') id_table: string,
    @Param('id_store') id_store: string,
  ) {
    return await this.tablesService.delete(id_store, id_table);
  }
}
