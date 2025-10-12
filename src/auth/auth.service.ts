import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { AuthDto } from './dto/auth.dto'
import { Response } from 'express'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  // сколько дней будет храниться наш рефреш токен
  // Для куки
  EXPIRE_DAY_REFRESH_TOKEN = 1
  REFRESH_TOKEN_NAME = 'refreshToken'

  constructor(
    private jwt: JwtService,
    private userService: UserService,
    private prisma: PrismaService,
    private configService: ConfigService
  ) {}

  // описываем методы
  // метод на логин пользователя
  async login(dto: AuthDto) {
    // валидируем через метод validateUser который описали ниже
    const user = await this.validateUser(dto)
    // Дальше генерируем токены
    const tokens = this.issueTokens(user.id)

    // при логине добавляем в поле user еще и токены досутпа и обновления
    return { user, ...tokens }
  }

  // метод для регистрации
  async register(dto: AuthDto) {
    // сначала делаем проверку на существования юзера в бд
    const oldUser = await this.userService.getByEmail(dto.email)

    // если такой пользователь с таким email существует при регистрации тогда выкидываем ошибку
    if (oldUser) throw new BadRequestException('Пользователь уже существует')

    // создаем юзера
    const user = await this.userService.create(dto)
    // Дальше генерируем токены
    const tokens = this.issueTokens(user.id)

    // при регистрации когда клиент будет в теле body запроса отправлять данные после всех проверок выше
    // если все хорошо вернем из метода register юзера с его полями и токены
    return { user, ...tokens }

    // вот такого формата будет респонс при успехе
    // {
    //     "user": {
    //         "id": "cmgm7pt220000es5cup0gl6ld",
    //         "createdAt": "2025-10-11T11:49:04.730Z",
    //         "updatedAt": "2025-10-11T11:49:04.730Z",
    //         "email": "test111@gmail.com",
    //         "password": "$argon2id$v=19$m=65536,t=3,p=4$z+Xl35nING4Rma0W5y3vgA$wxJUbXJ8wyDbf1SJL0BCgExdg+UoACrRfdTn6bkSbQo",
    //         "name": "testName",
    //         "picture": "/uploads/no-user-images.png"
    //     },
    //     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eAxODMzNDQsImV4cCI6MTc2MDE4Njk0NH0.rCJijLIhJHiMExEkVVXyAshD1H2CNOrmMAmMY4Hpr30",
    //     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MTc2MDc4ODE0NH0.hHmJgdrzDi5XWpfq8g_rGQpD_onWtVCyrJnSf6u4Qo4"
    // }
  }

  // метод для получения новых токенов
  // refreshToken будем получает в контроллере из наших куки
  async getNewTokens(refreshToken: string) {
    // верефицируем наш рефреш токен
    const result = await this.jwt.verifyAsync(refreshToken)

    // если токен не верефицирован
    if (!result) throw new UnauthorizedException('Невалидный refresh токен')

    // получаем юзера по id из result
    const user = await this.userService.getById(result.id)

    if (!user) throw new UnauthorizedException('Пользователь не найден')

    // Дальше генерируем токены для user
    const tokens = this.issueTokens(user.id)

    // добавляем в поле user еще и токены доступа и обновления
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
    // получаем юзера по еmail который приходит из dto и кладем в метод
    const user = await this.userService.getByEmail(dto.email)

    // если нет юзера выкидываем ошибку из nest
    if (!user) throw new NotFoundException('Пользователь не найден')

    return user
  }

  // метод валидации при авторизации яндекса или гугла
  // это метод будет срабатывать в гугл callback( '/auth/google/callback', '/auth/yandex/callback') при авторизации и яндекс
  // т.е если пользователь авторизовывается через эти сервисы

  // req:any потом req не известен и потому что авторизация у яндекса и гугла отличаются типы
  // если 1 провайдер то можно указать из документации яндекса или гугла типы и то не факт

  // req	Request (запрос)	Это объект, который содержит всю информацию о запросе, пришедшем от клиента (браузера, фронтенда, Postman и т.д.).
  // res	Response (ответ)	Это объект, через который сервер отправляет ответ клиенту (JSON, HTML, статус, cookie и т.д.).

  // req — это объект запроса, который передал тебе Passport OAuth (Google, Яндекс, GitHub и т.д.)
  // req.user — это данные пользователя, которые вернулись от OAuth-провайдера (Google,Яндекс, GitHub и т.д.)

  // flow как это работает
  // Пользователь на фронте - нажимает кнопку “Войти через Google”

  // Фронтенд (клиент) перенаправляет его на страницу авторизации Google:https://accounts.google.com/o/oauth2/auth?...client_id=...&redirect_uri=...

  // Пользователь входит в свой Google-аккаунт и Google спрашивает разрешение:
  // “Этот сайт хочет получить доступ к вашему email и профилю. Разрешить?”

  // После согласия Google возвращает пользователя на твой redirect URL — например:https://example.com/auth/google/callback?code=ABC123

  // Теперь твой backend получает этот code и сам делает запрос к Google API, чтобы обменять его на:
  // access_token

  // refresh_token

  // информацию о пользователе (email, имя, фото и т.д.)

  // Вот тут происходит реальное взаимодействие между твоим сервером и Google.

  // Теперь твой backend:
  // ищем юзера по email
  // если его нет то создаем его из призмы включая все поля связей юзера его список магазинов, избранное и заказы
  // берет токены
  // отправляет ответ клиенту в виде user и токенов

  async validateOAuthLogin(req: any) {
    // ищем юзера по email
    let user = await this.userService.getByEmail(req.user.email)

    // если нет юзера с таким email то создаем его из призмы включая все поля связей юзера его список магазинов, избранное и заказы
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: req.user.email,
          name: req.user.name,
          picture: req.user.picture
        },
        include: {
          stores: true,
          favorites: true,
          orders: true
        }
      })
    }

    // также берем токены
    const tokens = this.issueTokens(user.id)

    // возвращаем юзера с токенами
    return { user, ...tokens }
  }

  // методы для куки
  // добавление токена
  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    // получаем текущию дату
    const expiresIn = new Date()
    // задаем время, сначала получает текущию дату и прибавляем нашу переменую
    // указали дату жизни нашего токена, От текущего момента + 1 день
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

    // const isProduction = this.configService.get('NODE_ENV') === 'production'

    // в куки указываем наше имя куки, refreshToken и настройки под куки
    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      // тем самым указываем что это именно серверная кука
      httpOnly: true,
      // домен и получаем чисто домент из env(localhost)
      domain: this.configService.get('SERVER_DOMAIN'),
      // указываем дату жизни куки, которую мы делали выше
      expires: expiresIn,
      // Этот флаг указывает браузеру, что кука может быть отправлена только по защищённому протоколу HTTPS.
      // на проде должен быть true, на деве false
      secure: true,
      // secure: false,
      // на продакшене нужно указывать lax а на деве none

      // lax
      // Кука не отправляется при обычных cross-site запросах (например, fetch, AJAX), но отправляется при переходе по ссылке или сабмите формы.
      // Это безопасное значение по умолчанию, подходит для большинства случаев.

      // none
      // Кука всегда отправляется, даже при запросах с других доменов (например, фронтенд → API).
      // Нужно для SPA/Frontend, которые работают на другом домене или порту. Требует secure: true.
      sameSite: 'none'

      // secure: isProduction,
      // sameSite: isProduction ? 'lax' : 'none'
    })
  }

  // удаление токена при logout из системы
  removeRefreshTokenFromResponse(res: Response) {
    // const isProduction = this.configService.get('NODE_ENV') === 'production'

    // в куки указываем наше имя куки, пустую строку для очистки и настройки под куки
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      // тем самым указываем что это именно серверная кука
      httpOnly: true,
      // домен и получаем чисто домент из env(localhost)
      domain: this.configService.get('SERVER_DOMAIN'),
      // указываем дату жизни куки в 0
      expires: new Date(0),
      // Этот флаг указывает браузеру, что кука может быть отправлена только по защищённому протоколу HTTPS.
      secure: true,
      // secure: false,
      // на продакшене нужно указывать lax а на деве none

      // lax
      // Кука не отправляется при обычных cross-site запросах (например, fetch, AJAX), но отправляется при переходе по ссылке или сабмите формы.
      // Это безопасное значение по умолчанию, подходит для большинства случаев.

      // none
      // Кука всегда отправляется, даже при запросах с других доменов (например, фронтенд → API).
      // Нужно для SPA/Frontend, которые работают на другом домене или порту. Требует secure: true.
      sameSite: 'none'

      // secure: isProduction,
      // sameSite: isProduction ? 'lax' : 'none'
    })
  }
}
