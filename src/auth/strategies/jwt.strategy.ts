import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from 'src/user/user.service'

// Чтобы класс можно было "внедрить" (через конструктор в другие классы), Nest должен знать, что этот класс можно создать и хранить.
// @Injectable() говорит NestJS: "этот класс можно использовать как сервис/провайдер, регистрируй его в контейнере зависимостей".
// @Injectable() → делает класс провайдером.
// дальше расширяемся от библиотки и кладем в нее Strategy из библиоткеи Jwt пароль
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService
  ) {
    // ConfigService — это сервис NestJS для работы с переменными окружения (.env).
    // Метод get() достаёт значение переменной окружения по ключу.
    // В данном случае мы получаем секретный ключ JWT, который используется для проверки подписи токена.
    // вытаскиваем из env по ключу JWT_SECRET токен через configService
    const jwtSecret = configService.get('JWT_SECRET')

    // проверка
    if (!jwtSecret) throw new Error('JWT_SECRET is not defined in environment')

    super({
      // зачем нужен метод fromAuthHeaderAsBearerToken
      // если у нас авторизированный запрос чтобы мы вот так прокидывали `Bearer токенннн`
      // и из заголовка забирать
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration — это опция в passport-jwt, которая управляет тем, проверяется ли срок действия токена (JWT) при валидации.
      ignoreExpiration: true,
      // присваиваем нашу jwt в secretOrKey все это можно было и сразу написать в объекте, не вынося в переменные, но почему то ругается ts
      secretOrKey: jwtSecret
    })
  }

  // Обязательный метод получаем самого юзера
  // если мы расшифруем наш токен то мы получим оттуда только id и по этому id будем получать целого юзера
  async validate({ id }: { id: string }) {
    // возвращаем целого юзера по id через метод getById и прокидываем туда id который расшифровали из jwt токена
    return this.userService.getById(id)
  }
}
