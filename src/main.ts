import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())
  app.enableCors({
    origin: [process.env.CLIENT_URL], // Откуда разрешаем запросы (например, http://localhost:3000)
    credentials: true, // Разрешаем передавать cookie/авторизацию
    exposedHeaders: 'set-cookie' // Делаем заголовок 'set-cookie' доступным на фронте
  })

  await app.listen(process.env.SERVER_URL ?? 5000)
}
bootstrap()
