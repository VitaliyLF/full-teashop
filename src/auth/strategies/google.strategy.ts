import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
// указываем уже стратегию из гугла
import { Strategy } from 'passport-google-oauth20'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    super({
      // специальные env от гугла и тут мы их по ключу получаем
      // какие то проблемы с типизацией и нужно указывать ! как типо явно
      // потому что мы расширяемся от PassportStrategy и не можем использовать в super this, если бы могли тогда this.configService ссылался на то что приходит
      clientID: configService.get('GOOGLE_CLIENT_ID')!,
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET')!,
      // это url куда будет переадресовывать пользователя после авторизации через гугл
      // и прибавляем '/auth/google/callback' потом этот контроль опишем
      callbackURL: configService.get('SERVER_URL') + '/auth/google/callback',
      //Когда пользователь логинится через Google, Google спрашивает у него разрешения, какие данные он готов предоставить твоему приложению.
      // scope определяет, какие именно данные твой сервис хочет получить.
      scope: ['profile', 'email']
    })
  }

  async validate(...args: any[]) {}
}
