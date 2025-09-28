import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
// указываем уже стратегию из гугла
import { Profile, Strategy } from 'passport-yandex'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
  constructor(configService: ConfigService) {
    const clientID = configService.get('YANDEX_CLIENT_ID')
    const clientSecret = configService.get('YANDEX_CLIENT_SECRET')
    const serverUrl = configService.get('SERVER_URL')

    if (!clientID || !clientSecret || !serverUrl) {
      throw new Error(
        'Missing YANDEX OAuth env vars: YANDEX_CLIENT_ID/YANDEX_CLIENT_SECRET/SERVER_URL'
      )
    }

    super({
      clientID,
      clientSecret,
      callbackURL: serverUrl + '/auth/yandex/callback'
    })
  }

  async validate(_accessToken: string, _refreshToken: string, profile: Profile, done: any) {
    const { username, emails, photos } = profile

    const user = {
      emails: emails?.[0].value,
      name: username,
      picture: photos?.[0].value
    }
    done(null, user)
  }
}
