import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CategoryDto } from './dto/category.dto'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  // Метод для получения категории по конкрентному магазину
  async getByStoreId(storeId: string) {
    return this.prisma.category.findMany({
      where: {
        storeId
      }
    })
  }

  // Метод получения по id категории
  async getById(categoryId: string) {
    const category = await this.prisma.category.findUnique({
      // ищем по id категории который приходит
      where: {
        id: categoryId
      }
    })

    // если нет категории выкидываем ошибку
    if (!category) throw new NotFoundException('Категория не найдена по id')

    return category
  }

  // метод на создание Категории
  async create(storeId: string, dto: CategoryDto) {
    return this.prisma.category.create({
      data: {
        title: dto.title,
        description: dto.description,
        storeId
      }
    })
  }

  // метод на обновление Категории
  async update(categoryId: string, dto: CategoryDto) {
    // находи нашу категорию
    await this.getById(categoryId)

    return this.prisma.category.update({
      where: {
        id: categoryId
      },
      // в дату кладем весь объект dto
      data: dto
    })
  }

  // метод на удаление Категории
  async delete(categoryId: string) {
    // находи наш категорию
    await this.getById(categoryId)

    return this.prisma.category.delete({
      where: {
        id: categoryId
      }
    })
  }
}
