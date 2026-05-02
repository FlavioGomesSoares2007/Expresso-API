import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/AuthDto';
import { TableAuthDto } from './dto/TableAuthDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('store')
  async loginStore(@Body() dados: AuthDto) {
    return await this.authService.login(dados);
  }
  @HttpCode(HttpStatus.OK)
  @Post('table')
  async loginTable(@Body() dados: TableAuthDto) {
    return await this.authService.loginTable(dados);
  }
}
