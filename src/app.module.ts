import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserModule } from './user/user.module';

@Module({
  // imports: [], // сюда подключаются другие модули (например, UsersModule, AuthModule)
  // controllers: [AppController], // сюда подключаются контроллеры
  // providers: [AppService]s // сюда подключаются сервисы
  imports: [ConfigModule.forRoot(), AuthModule, UserModule] // чтобы читать env значения
})
export class AppModule {}
