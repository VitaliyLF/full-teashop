import { Controller, HttpCode, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FileService } from './file.service'
import { FilesInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @HttpCode(200)
  @UseInterceptors(FilesInterceptor('files'))
  @Auth()
  @Post()
  // описываем первым параметром файлы которые буду приходить в множественном числе
  // вторым параметром указываем папку которую будет получать из query параметра
  async saveFiles(@UploadedFiles() files: Express.Multer.File[], @Query('folder') folder?: string) {
    return this.fileService.saveFiles(files, folder)
  }
}
