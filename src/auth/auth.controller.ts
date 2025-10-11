import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

// @Controller('auth') это адресс наш http://хост/auth в адрессной строки
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // метод на логин
  // чтобы dto нормально работала
  @UsePipes(new ValidationPipe())
  // статус код
  @HttpCode(200)
  // post запрос по адресу login 'auth/login'
  @Post('login')
  // при post запросе на /auth/login с клиента в body которые имеет dto поля мы возвращаем через метод login объект с полями
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto)
  }

  // метод на регистрацию
  // чтобы dto нормально работала
  @UsePipes(new ValidationPipe())
  // статус код
  @HttpCode(200)
  // при post запросе на /auth/register с клиента в body которые имеет dto поля мы возвращаем через метод register объект с полями
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto)
  }
}
