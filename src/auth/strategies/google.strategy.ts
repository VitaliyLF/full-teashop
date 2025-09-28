import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
// указываем уже стратегию из гугла
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  // если убираем private тогда будем читать то что пришло в конструктор
  constructor(configService: ConfigService) {
    // делаем так из за типизации чтобы ts понимал что у нас строка
    const clientID = configService.get('GOOGLE_CLIENT_ID')
    const clientSecret = configService.get('GOOGLE_CLIENT_SECRET')
    const serverUrl = configService.get('SERVER_URL')

    // runtime-валидация: выбрасываем понятную ошибку, если чего-то нет
    if (!clientID || !clientSecret || !serverUrl) {
      throw new Error(
        'Missing Google OAuth env vars: GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET/SERVER_URL'
      )
    }

    super({
      // специальные env от гугла и тут мы их по ключу получаем
      // какие то проблемы с типизацией и нужно указывать ! как типо явно
      // потому что мы расширяемся от PassportStrategy и не можем использовать в super this, если бы могли тогда this.configService ссылался на то что приходит
      clientID,
      clientSecret,
      // это url куда будет переадресовывать пользователя после авторизации через гугл
      // и прибавляем '/auth/google/callback' потом этот контроль опишем
      callbackURL: serverUrl + '/auth/google/callback',
      //Когда пользователь логинится через Google, Google спрашивает у него разрешения, какие данные он готов предоставить твоему приложению.
      // scope определяет, какие именно данные твой сервис хочет получить.
      scope: ['profile', 'email']
    })
  }

  // метод на валидацию
  // это обязательно по документации
  // _accessToken не будем использовать и ставим нижнее подчеркивание, будем свои генерировать
  // _refreshToken тоже самое
  // дальше описываю profile и типизирую ее из библиотеки гугла
  // done то что будет происходит при успешной авторизации
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) {
    // из профиля берем имя пользователя
    // массив emailов
    // и фотографии т.е аватарка пользователя
    // это все когда пользователь авторизируется и соглашаеться с гугл авторизацией тогда мы можем из его гугл аккаунта брать эти вещи
    const { displayName, emails, photos } = profile

    // разворачиваю user и в него закидываю все что из гугла
    const user = {
      // берем первый email из настроек юзера
      emails: emails?.[0].value,
      name: displayName,
      picture: photos?.[0].value
    }

    // когда успешно тогда вторым параметром указываем нашего юзера
    done(null, user)
  }
}
