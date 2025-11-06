import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { ColorModule } from './color/color.module'
import { CategoryModule } from './category/category.module'
import { FileModule } from './file/file.module'
import { StoreModule } from './store/store.module'
import { OrderModule } from './order/order.module'
import { StatisticsModule } from './statistics/statistics.module'
import { ProductModule } from './product/product.module'
import { ReviewModule } from './review/review.module'

// модуль это точка входа тут все подключается чтобы использовать внутри
// Это корневой модуль приложения.
// В NestJS всё строится вокруг модулей.
@Module({
  // imports: [], // сюда подключаются другие модули (например, UsersModule, AuthModule) когда их создаем через nest g res user --no-spec
  // controllers: [AppController], // сюда подключаются контроллеры
  // providers: [AppServices] // сюда подключаются сервисы
  // ConfigModule.forRoot(), чтобы читать env значения
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    ColorModule,
    CategoryModule,
    FileModule,
    StoreModule,
    OrderModule,
    StatisticsModule,
    ProductModule,
    ReviewModule
  ]
})
export class AppModule {}
