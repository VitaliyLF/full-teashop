import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProductDto } from './dto/product.dto'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  // Метод на получение всех продуктов
  // параметром принимает query параметр (searchTerm - поисковой запрос)
  // параметр searchTerm имеет value и это value приходит в функцию
  async getAll(searchTerm?: string) {
    // если есть query параметр тогда вызываем функцию фультра по этому параметру
    if (searchTerm) return this.getSearchTermFilter(searchTerm)

    // ищем продукты в бд
    const products = await this.prisma.product.findMany({
      // сортируем продукты по полю
      orderBy: {
        // desc = по убыванию
        createdAt: 'desc'
      },
      // включаем поля которые будут находиться в глубине продукта
      include: {
        category: true
      }
    })

    return products
  }

  // метод для фильтрации по query параметру
  private async getSearchTermFilter(searchTerm: string) {
    return this.prisma.product.findMany({
      where: {
        // OR в Prisma — это логический оператор для объединения нескольких условий,
        // тут говорим что поиск будет происходить по колонкам в бд либо title либо description
        // на фронте когда мы в инпуте ищем продукт то мы можем вводить либо title либо description и будет находиться товар
        OR: [
          {
            // поиск будет происходит по title и description колонкам в бд если есть хоть одно слово там найдем нам продукты
            title: {
              // указываем если в title колонке продукта содержиться слово из query параметра который приходит
              contains: searchTerm,
              // указываем mode чтобы не зависило от регистра происходил поиск
              mode: 'insensitive'
            }
          },
          {
            description: {
              // указываем если в description колонке продукта содержиться слово из query параметра который приходит
              contains: searchTerm,
              mode: 'insensitive'
            }
          }
        ]
      },
      include: {
        category: true
      }
    })
  }

  // Метод для получения продуктов по storeId
  async getByStoreId(storeId: string) {
    return this.prisma.product.findMany({
      where: {
        storeId
      },
      // нужна глубина по запросу по магазину Id и включать поля category и color
      include: {
        category: true,
        color: true
      }
    })
  }

  // Метод получения продукта по id
  async getById(productId: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId
      },
      // нужна глубина по запросу по Id включать поля category и color и отзывы о продукте
      include: {
        category: true,
        color: true,
        reviews: {
          include: {
            user: true
          }
        }
      }
    })

    if (!product) throw new NotFoundException('Продукт не найден по id')

    return product
  }

  // Метод для получения продукта по категориям
  async getByCategory(categoryId: string) {
    // делаем findMany потому что у продукта может быть 2 категории или больше
    const products = await this.prisma.product.findMany({
      where: {
        category: {
          id: categoryId
        }
      },
      // нужна глубина по запросу по Id включать поля category
      include: {
        category: true
      }
    })

    if (!products) throw new NotFoundException('Продукты не найден по id категории')

    return products
  }

  // Метод для получения самых популярных продуктов
  // типо для секций хиты продах там выводяться
  // хиты продаж будут высчитываться по кол-ву записей в order item
  // т.е чем больше продуктов в таблице order вот по этому будут высчитываться
  async getMostPopular() {
    // groupBy редкая штука можно использовать для сбора какой то статистики

    // при использовании groupBy есть специальные агрегатные поля (поля в таблице по типу id, createAt вот эти),
    // которые позволяют посчитать статистику по сгруппированным данным.
    // формирует массив популярных товаров
    const mostPopularProducts = await this.prisma.orderItem.groupBy({
      // все это будем собирать по productId колонки в таблице orderItem
      // by: ['productId'] Группируем записи по продуктам
      by: ['productId'],
      // _count — это агрегатная функция.
      // считает количество id в таблице orderItem по productId группе.
      _count: {
        id: true
      },
      // Это сортировка результата по количеству, потом сортируем все записи от большего к меньшему
      // Означает: сортировать продукты по количеству заказов от большего к меньшему
      orderBy: {
        _count: {
          // desc = по убыванию
          id: 'desc'
        }
      }
    })

    // проходимся по массиву популярных продуктов и получаем id этих популярных продуктов
    // из за типизации указываем item.productId! потому что может быть null а не строка
    const productIds = mostPopularProducts.map(item => item.productId!)

    // потом ищем продукт по id продуктов популярных товаров
    const products = await this.prisma.product.findMany({
      where: {
        id: {
          // in в Prisma — это оператор фильтрации, который означает «значение поля находится в этом списке».

          // пример вернуть продукты с id 1, 2 или 3
          // id: { in: [1, 2, 3] }

          // в нашем случае мы говорим вернуть продукты по отфилтрованным id самых популярных товаров через оператор in
          in: productIds
        }
      },
      // также для популярных товаров еще нужно включить поля категории этих популярных товаров
      include: {
        category: true
      }
    })

    return products
  }

  // Метод на получение похожих товаров
  // они будут искаться по категориям
  async getSimilar(id: string) {
    // получаем сначала текущий продукт
    const currentProduct = await this.getById(id)

    // если у нас нет текущего продукта
    if (!currentProduct) throw new NotFoundException('Текущий товар не найден')

    const products = await this.prisma.product.findMany({
      // ищем похожие продукты по title категории
      where: {
        category: {
          title: currentProduct.category?.title
        },
        // NOT в Prisma — это логический оператор отрицания (инверсия условия).
        // исключая текущий продукт в списке похожих продуктов по текущему продукту
        NOT: {
          id: currentProduct.id
        }
      },
      // сортируем их по убыванию
      orderBy: {
        createdAt: 'desc'
      },
      // они еще будут включать категории
      include: {
        category: true
      }
    })

    return products
  }

  // метод на создание Продукта
  async create(storeId: string, dto: ProductDto) {
    // получает storeId для того чтобы записать его при создании продукта
    return this.prisma.product.create({
      data: {
        title: dto.title,
        description: dto.description,
        price: dto.price,
        images: dto.images,
        categoryId: dto.categoryId,
        colorId: dto.colorId,
        storeId
      }
    })
  }

  // метод на обновление Продукта
  async update(productId: string, dto: ProductDto) {
    await this.getById(productId)

    return this.prisma.product.update({
      where: {
        id: productId
      },
      // в дату кладем весь объект dto
      data: dto
    })
  }

  // метод на удаление Продукта
  async delete(productId: string) {
    await this.getById(productId)

    return this.prisma.product.delete({
      where: {
        id: productId
      }
    })
  }
}
