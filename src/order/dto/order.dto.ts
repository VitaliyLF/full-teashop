import { EnumOrderStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

export class OrderDto {
  // Enum (перечисление) — это специальный тип в языке программирования, который позволяет определить набор фиксированных значений.
  // NEW, PAID, SHIPPED, DELIVERED, CANCELLED
  @IsOptional()
  @IsEnum(EnumOrderStatus, {
    //  Object.values(EnumOrderStatus)  — берёт все значения из enum и формирует массив
    // .join(', ') — соединяет элементы массива в строку через запятую:
    message: 'Статус заказа должен быть одним из: ' + Object.values(EnumOrderStatus).join(', ')
  })
  status: EnumOrderStatus

  // указываем что items должны быть массивом
  @IsArray({ message: 'В заказе нет ни одного товара' })
  // Говорит валидатору: каждый элемент массива items должен быть валидирован как отдельный объект DTO
  // То есть внутри каждого OrderItemDto должны пройти проверки (quantity — число и т. д.)
  @ValidateNested({ each: true })
  // Преобразует items[] в массив экземпляров класса OrderItemDto
  // Превращает полученные объекты в DTO-класс, чтобы валидация работала
  @Type(() => OrderItemDto)
  items: OrderItemDto[]
}

export class OrderItemDto {
  @IsNumber({}, { message: 'Колличество должно быть числом' })
  quantity: number

  @IsNumber({}, { message: 'Цена должно быть числом' })
  price: number

  @IsString({ message: 'ID продукта должен быть строкой' })
  productId: string

  @IsString({ message: 'ID магазина должен быть строкой' })
  storeId: string
}
