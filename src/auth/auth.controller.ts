import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // метод на логин
  // чтобы dto нормально работала
  @UsePipes(new ValidationPipe())
  // статус код
  @HttpCode(200)
  // что это post запрос по адресу login 'auth/login'
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto)
  }

  // метод на регистрацию
  // чтобы dto нормально работала
  @UsePipes(new ValidationPipe())
  // статус код
  @HttpCode(200)
  // что это post запрос по адресу login 'auth/register'
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto)
  }
}
