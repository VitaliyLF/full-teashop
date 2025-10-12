import { Controller, Get, Param, Patch } from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from './decorators/user.decorator'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Метод на получения профиля юзера
  // Навешиваем декоратор auth
  // потому что получить профиль может только авторизированный пользователь
  @Auth()
  @Get('profile')
  async getProfile(@CurrentUser('id') userId: string) {
    return this.userService.getById(userId)
  }

  // Метод на добавление в избранное
  // делаем @Auth() потому что в избранное может добавлять только авторизированный пользователь
  @Auth()
  @Patch('profile/favorites/:productId')
  // указываем декоратор @Param('productId') потому что с клиента будет прилетать параметр в url продукта и тут мы его забераем
  async toggleFavorite(@CurrentUser('id') userId: string, @Param('productId') productId: string) {
    return this.userService.toggleFavorites(productId, userId)
  }
}
