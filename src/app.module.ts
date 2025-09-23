import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  // imports: [], // сюда подключаются другие модули (например, UsersModule, AuthModule)
  // controllers: [AppController], // сюда подключаются контроллеры
  // providers: [AppService]s // сюда подключаются сервисы
  imports: [ConfigModule.forRoot()] // чтобы читать env значения
})
export class AppModule {}
