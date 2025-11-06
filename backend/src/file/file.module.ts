import { Module } from '@nestjs/common'
import { FileService } from './file.service'
import { FileController } from './file.controller'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'

@Module({
  // ServeStaticModule — это встроенный модуль в NestJS, который позволяет отдавать статические файлы (например, изображения, CSS,) напрямую через ваш сервер.
  // Допустим, у вас есть папка uploads, где сохраняются файлы, и вы хотите, чтобы к ним можно было обращаться по URL, например:http://localhost:3000/uploads/my-photo.jpg
  imports: [
    ServeStaticModule.forRoot({
      // указываем рутовый путь обязательно из app-root-path и указываем название статической папки в который будет храниться все файлы
      rootPath: `${path}/uploads`,
      // URL-префикс, по которому будут доступны файлы
      // чтобы бы так было и показывалось http://localhost:3000/uploads/my-photo.jpg
      serveRoot: '/uploads'
    })
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
