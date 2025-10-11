import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@prisma/client'

export const CurrentUser = createParamDecorator((data: keyof User, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  const user = request.user

  // если нужно получать какие то поля из юзера то получаем только эти поля или всего юзера

  // @CurrentUser('id') только поле id у user
  // @CurrentUser() целый user со всеми полями
  return data ? user[data] : user
})

// вот так мы будем использовать если нужно получать какие то поля из юзера то получаем только эти поля или всего юзера
// @CurrentUser('id')
