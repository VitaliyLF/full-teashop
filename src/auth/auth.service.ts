import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private userService: UserService,
    private prisma: PrismaService
  ) {}

  // описываем методы
  // метод на логин пользователя
  async login(dto: AuthDto) {
    // валидируем через метод validateUser который описали ниже
    const user = await this.validateUser(dto)
    // Дальше генерируем токены
    const tokens = this.issueTokens(user.id)

    return { user, ...tokens }
  }

  // метод для регистрации
  async register(dto: AuthDto) {
    // сначала делаем проверку на существования юзера в бд
    const oldUser = await this.userService.getByEmail(dto.email)

    if (oldUser) throw new BadRequestException('Пользователь уже существует')

    // создаем юзера
    const user = await this.userService.create(dto)
    // Дальше генерируем токены
    const tokens = this.issueTokens(user.id)

    return { user, ...tokens }
  }

  // метод для получения токенов
  issueTokens(userId: string) {
    const data = { id: userId }

    // Генерируем токены

    // Токен доступа
    const accessToken = this.jwt.sign(data, {
      // указываем настройки

      // дата жизни
      expiresIn: '1h'
    })

    // Токен обновления
    const refreshToken = this.jwt.sign(data, {
      // указываем настройки

      // дата жизни
      expiresIn: '7d'
    })

    return { accessToken, refreshToken }
  }

  // метод для валидации user
  private async validateUser(dto: AuthDto) {
    // делаем проверку

    // получаем юзера по еmail который приходит из dto и кладем в метод
    const user = await this.userService.getByEmail(dto.email)

    // если нет юзера выкидываем ошибку из nest
    if (!user) throw new NotFoundException('Пользователь не найден')

    return user
  }
}
