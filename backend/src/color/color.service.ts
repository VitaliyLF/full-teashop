import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ColorDto } from './dto/color.dto'

@Injectable()
export class ColorService {
  constructor(private prisma: PrismaService) {}

  // Метод для получения цветов для конкрентного магазина чтобы их выводить в панеле управления магазина для каждого пользователя
  async getByStoreId(storeId: string) {
    return this.prisma.color.findMany({
      where: {
        storeId
      }
    })
  }

  // Метод получения по id цвет
  async getById(colorId: string) {
    const color = await this.prisma.color.findUnique({
      // ищем по id цвет который приходит
      where: {
        id: colorId
      }
    })

    // если нет цвета выкидываем ошибку
    if (!color) throw new NotFoundException('Цвет не найден по id')

    return color
  }

  // метод на создание Цвета
  async create(storeId: string, dto: ColorDto) {
    return this.prisma.color.create({
      data: {
        name: dto.name,
        value: dto.value,
        storeId
      }
    })
  }

  // метод на обновление Цвета
  async update(colorId: string, dto: ColorDto) {
    // находи наш цвет
    await this.getById(colorId)

    return this.prisma.color.update({
      where: {
        id: colorId
      },
      // в дату кладем весь объект dto
      data: dto
    })
  }

  // метод на удаление Цвета
  async delete(colorId: string) {
    // находи наш цвет
    await this.getById(colorId)

    return this.prisma.color.delete({
      where: {
        id: colorId
      }
    })
  }
}
