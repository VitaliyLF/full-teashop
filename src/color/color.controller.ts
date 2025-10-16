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
import { ColorService } from './color.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ColorDto } from './dto/color.dto'

@Controller('colors')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  // Метод для получения цветов для конкрентного магазина чтобы их выводить в панеле управления магазина для каждого пользователя
  // Получим все цвета которые есть у магазина
  @Auth()
  // получаем с помощью get и указываем динамическое значение /:storeId - это динамический параметр Id нашего цвета
  @Get('by-storeId/:storeId')
  async getByStoreId(@Param('storeId') storeId: string) {
    return this.colorService.getByStoreId(storeId)
  }

  // получение по id цвет
  // получать цвет может только авторизованный пользователь
  @Auth()
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.colorService.getById(id)
  }

  // создание цвета для магазина
  // ValidationPipe проходит по всем полям dto Store и проверяет валидаторы (@IsEmail(), @MinLength(), @IsOptional() и т.д.),
  // если что-то не прошло — бросает BadRequestException с сообщениями об ошибках.
  @UsePipes(new ValidationPipe())
  // статус код об успехе
  @HttpCode(200)
  // только авторизированный пользователь может создавать цвета
  @Auth()
  // получаем в url динамический storeId магазина
  @Post(':storeId')
  // указываем в параметрах нашу dto
  async create(@Param('storeId') storeId: string, @Body() dto: ColorDto) {
    return this.colorService.create(storeId, dto)
  }

  // Обновление уже созданного цвета
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  // только авторизированный пользователь может обновлять цвета
  @Auth()
  // будет put запрос на полную замену ресурса и указываем параметр :id
  @Put(':id')
  // указываем в параметрах юзера и нашу dto
  // указываем в  @Param('id') обязательно нужное нам поле а не весь объект
  async update(@Param('id') id: string, @Body() dto: ColorDto) {
    return this.colorService.update(id, dto)
  }

  // Удаление уже созданного цвета
  @HttpCode(200)
  // только авторизированный пользователь может удалять цвета
  @Auth()
  // будет Delete запрос на полое удаление ресурса по указанному параметру :id
  @Delete(':id')
  // указываем в параметрах юзера и нашу dto
  async delete(@Param('id') id: string) {
    return this.colorService.delete(id)
  }
}
