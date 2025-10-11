import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'

// точка входа
async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())
  // включение cors чтобы была связь между сервером и клиентом безопасная чтобы могли запросы нормально отравлять
  // Это нужно, чтобы браузер разрешил фронтенду (например, React/Vue) обращаться к твоему бэкенду, если они на разных доменах/портах.
  app.enableCors({
    origin: [process.env.CLIENT_URL], // Откуда разрешаем запросы (например, http://localhost:3000) или продовское значение
    credentials: true, // Разрешаем передавать cookie/авторизацию
    exposedHeaders: 'set-cookie' // Делаем заголовок 'set-cookie' доступным на фронте
  })

  await app.listen(5000) // настройка порта, можно подключить из env и сделать ?? 500
}
bootstrap()
