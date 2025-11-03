import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { ReviewService } from './review.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ReviewDto } from './dto/review.dto'
import { CurrentUser } from 'src/user/decorators/user.decorator'

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // получаем отзыв по storeId
  @Auth()
  @Get('by-storeId/:storeId')
  async getByStoreId(@Param('storeId') storeId: string) {
    return this.reviewService.getByStoreId(storeId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  // получаем в url динамический сегмент пути - productId продукта и storeId магазина
  @Post(':storeId/:productId')
  // указываем в параметрах 4 аргумента
  async create(
    @CurrentUser('id') userId: string,
    @Param('storeId') storeId: string,
    @Param('productId') productId: string,
    @Body() dto: ReviewDto
  ) {
    return this.reviewService.create(userId, productId, storeId, dto)
  }

  @Auth()
  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.reviewService.delete(id, userId)
  }
}
