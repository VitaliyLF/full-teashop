import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'

// здесь будем описывать методы
@Injectable()
export class UserService {
  // в конструкторе подключаем призму

  // что такое private readonly
  // 1) это синтаксический сахар
  // 2)private — поле доступно только внутри класса (this.prisma). Из вне (из других классов/файлов) к нему обратиться нельзя.
  // 3)readonly — после присвоения (обычно в конструкторе) ссылка на это поле нельзя переназначить. То есть вы не можете сделать this.prisma = ... позже — TypeScript выдаст ошибку.
  constructor(private readonly prisma: PrismaService) {}

  // описываем методы

  // получение юзера по id
  async getById(id: string) {
    // для того чтобы работать с призмой проверить в схеме output и удалить кастомный путь
    // дальше все поля должны быть типизированны и автокомплититься
    // дальше мы в призме ищем модель юзера и через метод findUnique ищет ровно одну запись в таблице по уникальному полю или составному уникальному ключу.
    const user = await this.prisma.user.findUnique({
      // мы ищем в таблице пользователя по id
      where: {
        id
      },
      // есть 2 способа возвращать поля через
      // через select мы указываем какие конкретные поля должны еще возвращаться из бд
      // select → вы явно указываете, какие поля вернуть. и если есть еще вложенные поля то опять нужно уже внутри писать select
      // include — позволяет подгружать связанные данные (реляции).
      // include → вы указываете, какие связи подгрузить вместе с записью. сразу все связанные поля подгрузяться
      include: {
        // возращаем у пользователя все магазины если есть ими созданные, все избранные товары и все заказы
        stores: true,
        favorites: {
          include: {
            category: true
          }
        },
        orders: true
      }
    })

    // в конце обязательно нужно возвращать user
    return user
  }

  // получение юзера по email
  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      },

      include: {
        stores: true,
        favorites: true,
        orders: true
      }
    })

    return user
  }

  // Метод на добавление в избранное
  // функционал добавления в избранное
  // принимает продукт чтобы понимать что добавлять в избранное и юзера
  async toggleFavorites(productId: string, userId: string) {
    // получаем нашего юзера
    const user = await this.getById(userId)

    // делаем проверку на существование такого продукта в бд у юзера
    // some проверяет, есть ли хотя бы один элемент массива, удовлетворяющий заданному условию.
    // Если функция вернёт true хотя бы один раз, .some() сразу остановится и вернёт true.
    const isExists = user?.favorites.some(product => product.id === productId)

    // обновляем у юзера в бд
    await this.prisma.user.update({
      // ищем по id нашего юзера
      where: {
        id: user?.id
      },
      data: {
        favorites: {
          // в массиве favorites по ключу если есть такой продукт делаем его disconnect есть нет connect
          // если у пользователя в массиве favorites есть уже продукт с таким id тогда удаляй его,
          //   favorites: {
          //   disconnect: { id: 'p2' }  // удаляем связь
          // }
          // еусли у пользователя нет такого товара то добавляй
          // "favorites": [
          //   { "id": "p1", "name": "iPhone 15" }
          // ]
          [isExists ? 'disconnect' : 'connect']: {
            id: productId
          }
        }
      }
    })

    return true
  }

  // полностью цепочка создания юзера
  // 1) клиент отправляет http Запрос с body где есть поля для юзера на сервер
  // 2) на сервере есть контроллер который принимает этот запрос обрабатывает метод
  // дальше nest сам достает json из body приводит его к классу AuthDto проверяет через class-validator.
  // 3) дальше на сервер должны описать AuthDto какие типы у полей должны быть, если клиент отправил что то не то сразу вернеться на клиент ошибка 400
  // 4) Если валидация прошла успешно, контроллер передаёт DTO в сервис в нашу функцию create
  // 5) Метод this.prisma.user.create(...) формирует SQL-запрос для базы данных.
  // 6) Postgres сохраняет новую строку в таблицу user и возвращает созданную запись.

  // создание user в бд
  // DTO = Data Transfer Object → объект передачи данных.
  // Это просто класс (или интерфейс), который описывает структуру данных, которые приходят от клиента (например, в body запроса)
  async create(dto: AuthDto) {
    // Метод create добавляет новую запись в таблицу базы данных.
    // Передаёте объект data, где описаны поля для вставки
    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        // делаем пароль из библиотеки для хеширования и прокидываем туда наш пароль из клиента
        password: await hash(dto.password)
      }
    })
  }
}
