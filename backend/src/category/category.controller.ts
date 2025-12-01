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
import { CategoryService } from './category.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CategoryDto } from './dto/category.dto'

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Метод для получения категории по конкрентному магазину
  @Auth()
  // получаем с помощью get и указываем динамическое значение /:storeId - это динамический сегмент пути Id нашей категории
  @Get('by-storeId/:storeId')
  async getByStoreId(@Param('storeId') storeId: string) {
    return this.categoryService.getByStoreId(storeId)
  }

  // получение по id категории
  // обязательно указывает динамический сегмент пути :id
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.categoryService.getById(id)
  }

  // создание категории для магазина
  // ValidationPipe проходит по всем полям dto Store и проверяет валидаторы (@IsEmail(), @MinLength(), @IsOptional() и т.д.),
  // если что-то не прошло — бросает BadRequestException с сообщениями об ошибках.
  @UsePipes(new ValidationPipe())
  // статус код об успехе
  @HttpCode(200)
  // только авторизированный пользователь может создавать категории
  @Auth()
  // получаем в url динамический сегмент пути - storeId магазина
  @Post(':storeId')
  // указываем в параметрах нашу dto
  async create(@Param('storeId') storeId: string, @Body() dto: CategoryDto) {
    return this.categoryService.create(storeId, dto)
  }

  // Обновление уже созданой категории польностью объект
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  // будет put запрос на полную замену ресурса и указываем параметр :id
  @Put(':id')
  // указываем в параметрах юзера и нашу dto
  // указываем в  @Param('id') динамический сегмент пути по которому мы меняем весь объект категории
  async update(@Param('id') id: string, @Body() dto: CategoryDto) {
    return this.categoryService.update(id, dto)
  }

  // Удаление уже созданой категории
  @HttpCode(200)
  @Auth()
  // будет Delete запрос на полое удаление ресурса по указанному параметру :id
  @Delete(':id')
  // указываем в параметрах юзера и нашу dto
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(id)
  }
}
