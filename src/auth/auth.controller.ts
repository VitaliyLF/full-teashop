import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import type { Request, Response } from 'express'
import { GoogleAuthGuard } from './guards/google-auth.guard'
import { YandexAuthGuard } from './guards/yandex-auth.guard'

// Контроллер — это класс, который отвечает за обработку HTTP-запросов от клиента.
// Проще говоря: контроллер — это «входная дверь» в серверную логику.

// Контроллер → Сервис → Контроллер → Клиент
// клиент делает запрос Контроллер принимает его и отправляет на сервис, там сервис делает логику и возвращает в контроллер, а контроллер уже возвращает ответ на клиента

// Контроллер:
// слушает определённые HTTP-маршруты (например /auth/login, /auth/register)
// принимает данные от клиента (body, query, params, headers)
// вызывает сервисы, чтобы выполнить бизнес-логику
// возвращает результат клиенту (JSON, статус-коды, cookie, заголовки и т.д.)

// @Controller('auth') "все маршруты в этом классе начинаются с /auth".
// /auth/login
// /auth/register
@Controller('auth')
export class AuthController {
  // AuthService сервис, где реализована вся бизнес-логика регистрации и логина
  constructor(private readonly authService: AuthService) {}

  // метод на логин
  // чтобы dto нормально работала

  // @UsePipes(new ValidationPipe()) — это декоратор NestJS, который подключает валидацию данных для данного метода (или контроллера целиком).
  // Перед тем как вызвать метод (например, login или register), проверь, что данные в @Body() соответствуют правилам, описанным в DTO (AuthDto).

  // ValidationPipe проходит по всем полям dto AuthDto и проверяет валидаторы (@IsEmail(), @MinLength(), @IsOptional() и т.д.),
  // если что-то не прошло — бросает исключение (BadRequestException) с сообщениями об ошибках.

  // проверяет, что пришедший dto соответствует правилам из AuthDto
  @UsePipes(
    new ValidationPipe({
      // forbidNonWhitelisted Выдаёт ошибку, если пришли “лишние” поля от клиента
      // т.е если клиент пришлет лишнии поля то все упадет ошибкой
      // forbidNonWhitelisted: true

      // "Возьми только те поля, которые описаны в DTO, а всё остальное — удали из объекта, но не выбрасывай ошибку."
      // если эта настройка включена то если от клиента придут лишнии поля в dto то он возмет только те которые описаны в dto и не будет ошибки
      // whitelist: true

      // чтобы была ошибка нужно их forbidNonWhitelisted и whitelist использоват в связки только если будут переданы поля которых нет в dto тогда будет ошибка
      // forbidNonWhitelisted: true,
      // whitelist: true

      // чтобы не было ошибки нужно whitelist и transform в связке использовать тогда если с клиента будут лишнии поля то они не пройдут
      // и будут использованы которые есть только в dto
      whitelist: true,
      transform: true
    })
  )
  // слушает определённые HTTP-маршруты
  // этот метод обрабатывает POST-запросы на /auth/login
  @Post('login')
  // при post запросе на /auth/login с клиента в body которые имеет dto поля мы возвращаем через метод login объект с полями

  // возвращает результат клиенту

  // @Body() dto: AuthDto — данные из тела запроса (req.body)
  // @Res({ passthrough: true }) res: Response — позволяет работать с HTTP-ответом (например, ставить cookie), не забирая полностью управление у NestJS

  // если я ставлю в респонсе passthrough: true
  // то NestJS оставляет за тобой возможность работать с объектом Response, например устанавливать cookie или заголовки или работать с refreshToken.
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    // берем из dto при логине refreshToken и забираем остальные поля из dto
    const { refreshToken, ...response } = await this.authService.login(dto)

    // при ответе клиенту в куку закидываем refreshToken и время жизни куки
    this.authService.addRefreshTokenToResponse(res, refreshToken)

    // возвращаем ответ клиенту
    return response
  }
  // статус код на выходе если все прошло успешно
  @HttpCode(200)

  // метод на регистрацию
  // чтобы dto нормально работала
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true
      transform: true
      // exceptionFactory: errors => {
      //   const messages = errors.map(err => {
      //     // if (err.constraints) {
      //     //   // стандартные ошибки от class-validator
      //     //   return Object.values(err.constraints)
      //     // }

      //     if (err.constraints) {
      //       // если есть whitelistValidation — переводим его
      //       if (err.constraints.whitelistValidation) {
      //         return `Поле "${err.property}" не должно присутствовать`
      //       }

      //       // иначе — возвращаем все остальные сообщения (isEmail, minLength и т.д.)
      //       return Object.values(err.constraints)
      //     }

      //     return 'Ошибка валидации'
      //   })

      //   return new BadRequestException(messages)
      // }
    })
  )
  // при post запросе на /auth/register с клиента в body которые имеет dto поля мы возвращаем через метод register объект с полями
  @Post('register')
  async register(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.register(dto)

    // при отвевети в куку закидываем refreshToken и время жизни куки
    this.authService.addRefreshTokenToResponse(res, refreshToken)

    // возвращаем ответ клиенту
    return response
  }
  // статус код ответа
  @HttpCode(200)

  // метод на получения новых токенов
  // получение юзера с обновленным токеном
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  )
  // статус код
  @HttpCode(200)
  // при post запросе на /login/access-token с клиента
  @Post('login/access-token')
  async getNewTokens(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    // получаем refreshToken при запросе от клиента летит и кука берем оттуда имя
    const refreshTokenFromCookies = req.cookies[this.authService.REFRESH_TOKEN_NAME]

    // если не пришел токен из кук от клиента
    if (!refreshTokenFromCookies) {
      // очищаем куку
      this.authService.removeRefreshTokenFromResponse(res)
      // выкидываем ошибку
      throw new UnauthorizedException('refreshToken не прошел')
    }

    // если все норм прокидываем рефреш токен из куки
    const { refreshToken, ...response } =
      await this.authService.getNewTokens(refreshTokenFromCookies)

    // при ответе в куку закидываем refreshToken и время жизни куки
    this.authService.addRefreshTokenToResponse(res, refreshToken)

    // возвращаем ответ клиенту
    return response
  }

  // метод logout когда user вышел с сайта
  // этот метод будет удалять наш refreshToken

  @HttpCode(200)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    // когда пользователь нажимает logout Клиент делает HTTP-запрос на ваш бэкенд по адресу /auth/logout
    // POST /auth/logout попадает в контроллер
    // res нужен для того, чтобы сервер мог изменить cookie на клиенте (удалить refresh-токен).
    this.authService.removeRefreshTokenFromResponse(res)

    return true
  }

  // описание контроллеров от гугл и яндекса
  // /auth/google на него будет переадрисосывать User когда он будет нажимать на кнопку авторизации
  @Get('google')
  // @UseGuards Его основная задача — решать, можно ли пользователю продолжить выполнение запроса (т.е. разрешить доступ к контроллеру или нет).
  // UseGuards своего рода защита маршрута которую нужно пройти чтобы дальше выполнился запрос
  // «Прежде чем выполнять метод контроллера @Get('google'), проверь условия в Guard. Если Guard разрешит — продолжай. Если нет — верни ошибку (например, 401 Unauthorized).»
  // Если он вернёт true → Nest пускает запрос дальше (метод контроллера выполняется).
  // Если он вернёт false или выбросит исключение → Nest останавливает запрос (контроллер не вызывается).

  // 1) Когда запрос от клиента попадает на этот маршрут /auth/google, NestJS вызывает Guard — AuthGuard('google').
  // Это Guard из пакета @nestjs/passport, который связан с GoogleStrategy
  // 2) Guard вызывает метод authenticate() у passport-google-oauth20 стратегии.
  // 3) Эта стратегия перенаправляет пользователя на страницу входа Google, добавив нужные параметры (client_id, redirect_uri, scope и т.д.).
  // Guard перехватывает запрос и делает redirect на Google.
  // После успешного логина Google редиректит обратно на твой сервер, на маршрут, который ты указал как redirect_uri, например:https://your-server.com/auth/google/callback
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() _req) {}

  // метод
  // тот url куда будет переадресовывать пользователя после того как user выберет аккаунт
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    // от гугла приходит req с объектом и данными от пользователя и его email и проверяем через validateOAuthLogin
    const { refreshToken, ...response } = await this.authService.validateOAuthLogin(req)

    // при ответе в куку закидываем refreshToken и время жизни куки
    this.authService.addRefreshTokenToResponse(res, refreshToken)

    // после успешного вшития refreshToken и ответа перенаправляем пользователя на страницу dashboard
    // в качестве query параметра указывать access token
    // зачем это нужно? когда пользователя будет редеректить на dashboard страницу мы на клиенте в куки будет устанавливать accessToken
    return res.redirect(
      `${process.env['CLIENT_URL']}/dashboard?accessToken=${response.accessToken}`
    )
  }

  @Get('yandex')
  @UseGuards(YandexAuthGuard)
  async yandexAuth(@Req() _req) {}

  @Get('yandex/callback')
  @UseGuards(YandexAuthGuard)
  async yandexAuthCallback(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.validateOAuthLogin(req)

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return res.redirect(
      `${process.env['CLIENT_URL']}/dashboard?accessToken=${response.accessToken}`
    )
  }
}
