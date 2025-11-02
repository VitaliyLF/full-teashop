import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { FileResponse } from './file.interface'

@Injectable()
export class FileService {
  // метод для сохранения файлов
  // принимает сам файл и типизацию такую и ставим в множественном числе массивом
  // дальше принимает папку (папка в которую будут сохраняться файлы) и по дефолту ставим products потому что у нас загрузка файлов будет только для продуктов
  async saveFiles(files: Express.Multer.File[], folder: string = 'products') {
    // указываем путь куда будут сохраняться файлы в какую папку
    const uploadedFolder = `${path}/uploads/${folder}`

    // этим мы говорим что если у нас не будет такого пути как в переменной uploadedFolder
    // то его надо создать
    await ensureDir(uploadedFolder)

    // указываем Promise.all потому что все будет ассинхронно
    const response: FileResponse[] = await Promise.all(
      // проходимся по всем нашим файлам
      // в маp используеться async потому что запись идёт асинхронно (через промис), и вы ждёте, пока файл полностью загрузиться на сервер, прежде чем идти дальше.
      files.map(async file => {
        // генерируем имя для файла
        // указываем генерацию рандомного имени через  Date.now + имя файла
        const originalName = `${Date.now()}-${file.originalname}`

        // делает запись (сохранение) загруженного файла на диск сервера.
        // ${uploadedFolder}/${originalName} — это путь, по которому будет создан файл.
        // file.buffer — это содержимое (байты) загруженного файла.
        await writeFile(`${uploadedFolder}/${originalName}`, file.buffer)

        return {
          url: `/uploads/${folder}/${originalName}`,
          name: originalName
        }
      })
    )

    return response
  }
}
