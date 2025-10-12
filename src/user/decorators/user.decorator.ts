import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@prisma/client'

// кастомные декораторы параметров
// Этот декоратор позволяет тебе удобно получать текущего пользователя (req.user) прямо в параметрах контроллера и не писать каждый раз одно и то же вручную.
// createParamDecorator — это функция из NestJS, которая помогает создать кастомный параметр-декоратор.
// ExecutionContext — это объект, через который мы получаем доступ к текущему запросу, ответу и т.д.

// keyof User — это TypeScript-тип, который означает "все имена свойств (ключи) типа User".
// Чтобы TypeScript не позволял написать, например, @CurrentUser('invalidField'), тип data ограничивают именно keyof User.
export const CurrentUser = createParamDecorator((data: keyof User, ctx: ExecutionContext) => {
  // ctx.switchToHttp().getRequest() → достаёт HTTP-запрос (эквивалентно @Req() в контроллере).
  const request = ctx.switchToHttp().getRequest()
  const user = request.user

  // если нужно получать какие то поля из юзера то получаем только эти поля или всего юзера

  // @CurrentUser('id') только поле id у user
  // @CurrentUser() целый user со всеми полями
  // user[data] - получаем по ключу свойство в объекте user
  return data ? user[data] : user
})

// вот так мы будем использовать если нужно получать какие то поля из юзера то получаем только эти поля или всего юзера
// @CurrentUser('id')
