import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [UserController],
  // будем в этой модели использовать призу поэтому подключаем клиента
  providers: [UserService, PrismaService]
})
export class UserModule {}
