import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ReviewDto } from './dto/review.dto'

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  // Метод для получения отзыва по store id
  async getByStoreId(storeId: string) {
    return this.prisma.review.findMany({
      where: {
        storeId
      },
      // возвращается весь отзыв + все поля user
      include: {
        user: true
      }
    })
  }

  // Метод получения по id отзыва нужен для того чтобы мы проверяли что владелец удаляет отзывы нам не нужно получать отзывы
  async getById(reviewId: string, userId: string) {
    const review = await this.prisma.review.findUnique({
      // делаем еще поиск и по userId чтобы как бы проверять является ли пользователь владельцем этого отзыва
      where: {
        id: reviewId,
        userId
      },
      // include — позволяет подгружать связанные данные (реляции).
      // include → вы указываете, какие связи подгрузить вместе с записью. сразу все связанные поля подгрузяться
      include: {
        user: true
      }
    })

    if (!review) throw new NotFoundException('Отзыв не найден или вы не являетесь его владельцем')

    return review
  }

  // Метод на создание отзыва
  async create(userId: string, productId: string, storeId: string, dto: ReviewDto) {
    return this.prisma.review.create({
      data: {
        // разворачиваем нашу дто
        ...dto,
        // делаем коннект чтобы сразу оставляя отзыв все летело в таблички в бд сущностей
        product: {
          // делаем коннект с продуктом
          connect: {
            id: productId
          }
        },
        user: {
          // делаем коннект с юзером
          connect: {
            id: userId
          }
        },
        store: {
          // делаем коннект с магазином
          connect: {
            id: storeId
          }
        }
      }
    })
  }

  // Метод на удаление отзыва
  async delete(id: string, userId: string) {
    await this.getById(id, userId)

    return this.prisma.review.delete({
      where: {
        id
      }
    })
  }
}
