import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { ProductService } from './product.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ProductDto } from './dto/product.dto'

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // получение всех продуктов
  @Get()
  // из query параметра забираем searchTerm и прокидываем в функцию
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.productService.getAll(searchTerm)
  }

  // получаем продукты по storeId
  @Auth()
  @Get('by-storeId/:storeId')
  async getByStoreId(@Param('storeId') storeId: string) {
    return this.productService.getByStoreId(storeId)
  }

  // получаем продукты по id
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.productService.getById(id)
  }

  // получаем продукты по категориям
  @Get('by-category/:categoryId')
  async getByCategory(@Param('categoryId') categoryId: string) {
    return this.productService.getByCategory(categoryId)
  }

  // получаем самые популярные продукты
  @Get('most-popular')
  async getMostPopular() {
    return this.productService.getMostPopular()
  }

  // получаем похожие продукты
  @Get('similar/:id')
  async getSimilar(@Param('id') id: string) {
    return this.productService.getSimilar(id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  // получаем в url динамический сегмент пути - storeId магазина
  @Post(':storeId')
  // указываем в параметрах нашу dto
  async create(@Param('storeId') storeId: string, @Body() dto: ProductDto) {
    return this.productService.create(storeId, dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productService.update(id, dto)
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productService.delete(id)
  }
}
