import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from 'src/user/user.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from 'src/config/jwt.config'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { GoogleStrategy } from './strategies/google.strategy'
import { YandexStrategy } from './strategies/yandex.strategy'

// модуль это точка входа тут все подключается чтобы использовать внутри
@Module({
  // массив импортов модулей
  // в поле imports вы регистрируете модули, от которых AuthModule зависит — таким образом Nest делает их экспортируемые провайдеры доступными внутри AuthModule
  imports: [
    // AuthModule получает доступ к экспортируемым из UserModule провайдерам (например, чтобы проверять пользователя при логине).
    UserModule,
    // Модуль конфигурации (обычно от @nestjs/config) — предоставляет ConfigService, который читает переменные окружения и т.п.
    ConfigModule,
    // регистрируете JwtModule (от @nestjs/jwt) динамически / асинхронно, с настройками, которые вычисляются в рантайме.
    JwtModule.registerAsync({
      // говорит Nest, что для вычисления опций JwtModule нужен ConfigModule.
      imports: [ConfigModule],
      // список зависимостей, которые нужно передать в useFactory. Здесь вы просите Nest передать экземпляр ConfigService.
      inject: [ConfigService],
      // useFactory: getJwtConfig — функция, которая возвращает конфигурацию для JwtModule в моем случае secret.
      // Поскольку фабрика может использовать ConfigService, вы передаёте его через inject.
      useFactory: getJwtConfig
    })
  ],
  controllers: [AuthController],
  // подключаем то что будем использовать внутри
  providers: [AuthService, PrismaService, UserService, JwtStrategy, GoogleStrategy, YandexStrategy]
})
export class AuthModule {}
