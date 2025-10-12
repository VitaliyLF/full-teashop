import { IsString } from 'class-validator'
import { CreateStoreDto } from './create-store.dto'

// расширяемся от CreateStoreDto чтобы доп получать и имя магазина
export class UpdateStoreDto extends CreateStoreDto {
  @IsString({
    message: 'Описание обязательно'
  })
  description: string
}
