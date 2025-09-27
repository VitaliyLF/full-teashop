import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

// ассихронная функция которая при помощи configService мы вытаскиваем нашу переменную JWT_SECRET из env
export const getJwtConfig = async (configService: ConfigService): Promise<JwtModuleOptions> => ({
  // ConfigService — это сервис NestJS для работы с переменными окружения (.env).
  // Метод get() достаёт значение переменной окружения по ключу.
  // В данном случае мы получаем секретный ключ JWT, который используется для проверки подписи токена.
  secret: configService.get('JWT_SECRET')
})
