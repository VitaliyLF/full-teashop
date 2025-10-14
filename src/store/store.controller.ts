import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { StoreService } from './store.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/user/decorators/user.decorator'
import { CreateStoreDto } from './dto/create-store.dto'
import { UpdateStoreDto } from './dto/update-store.dto'

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  // получени по id магазина
  // получать магазин может только авторизованный пользователь
  @Auth()
  // получаем с помощью get и указываем динамическое значение /:id - это динамический параметр Id нашего магазина
  @Get('by-id/:id')
  async getById(@Param('id') storeId: string, @CurrentUser('id') userId: string) {
    return this.storeService.getById(storeId, userId)
  }

  // создание store
  // ValidationPipe проходит по всем полям dto Store и проверяет валидаторы (@IsEmail(), @MinLength(), @IsOptional() и т.д.),
  // если что-то не прошло — бросает BadRequestException с сообщениями об ошибках.
  @UsePipes(new ValidationPipe())
  // статус код об успехе
  @HttpCode(200)
  // только авторизированный пользователь может создавать магазины
  @Auth()
  // будет корень stores
  @Post()
  // указываем в параметрах юзера и нашу dto
  async create(@CurrentUser('id') userId: string, @Body() dto: CreateStoreDto) {
    return this.storeService.create(userId, dto)
  }

  // Обновление уже созданного магазина
  @UsePipes(new ValidationPipe())
  // статус код об успехе
  @HttpCode(200)
  // только авторизированный пользователь может обновлять магазины
  @Auth()
  // будет put запрос на полную замену ресурса и указываем параметр :id
  @Put(':id')
  // указываем в параметрах юзера и нашу dto
  // указываем в  @Param('id') обязательно нужное нам поле а не весь объект
  async update(
    @Param('id') storeId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateStoreDto
  ) {
    return this.storeService.update(storeId, userId, dto)
  }

  // Удаление уже созданного магазина
  // статус код об успехе
  @HttpCode(200)
  // только авторизированный пользователь может удалять магазины
  @Auth()
  // будет Delete запрос на полое удаление ресурса по указанному параметру :id
  @Delete(':id')
  // указываем в параметрах юзера и нашу dto
  async delete(@Param('id') storeId: string, @CurrentUser('id') userId: string) {
    return this.storeService.delete(storeId, userId)
  }
}
