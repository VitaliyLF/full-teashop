import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateStoreDto } from './dto/create-store.dto'
import { UpdateStoreDto } from './dto/update-store.dto'

// Каждый пользователь может создавать магазины товаров под себя это и есть сущность store
@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  // получение магазина по id
  async getById(storeId: string, userId: string) {
    // ищем сам store по двум параметрам
    const store = await this.prisma.store.findUnique({
      // ищем и по юзереу и по storeId
      // почему userId потому что пользователь который хочет получить store должен быть его владельцем поэтому нужен userId
      where: {
        id: storeId,
        userId
      }
    })

    // если нет store
    if (!store) throw new NotFoundException('Магазин не найден или вы не являетесь его владельцем')

    return store
  }

  // метод на создание магазина
  async create(userId: string, dto: CreateStoreDto) {
    return this.prisma.store.create({
      data: {
        title: dto.title,
        // устанавливает текущий id пользователя
        userId
      }
    })
  }

  // метод на обновление магазина
  async update(storeId: string, userId: string, dto: UpdateStoreDto) {
    // находи наш store
    await this.getById(userId, storeId)

    return this.prisma.store.update({
      where: {
        id: storeId
      },
      data: {
        title: dto.title,
        // устанавливает текущий id пользователя
        userId
      }
    })
  }

  // метод на удаление магазина
  async delete(storeId: string, userId: string) {
    // находи наш store
    await this.getById(userId, storeId)

    return this.prisma.store.delete({
      where: {
        id: storeId
      }
    })
  }
}
