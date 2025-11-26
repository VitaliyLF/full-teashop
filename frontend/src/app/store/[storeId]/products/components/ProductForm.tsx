'use client'
import { Trash } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'
import ConfirmModal from '@/components/ui/modals/ConfirmModal'

import { useCreateProduct } from '@/hooks/queries/products/useCreateProduct'
import { useDeleteProduct } from '@/hooks/queries/products/useDeleteProduct'
import { useUpdateProduct } from '@/hooks/queries/products/useUpdateProduct'

import { ICategory } from '@/shared/types/category.interface'
import { IColor } from '@/shared/types/color.interface'
import { IProduct, IProductInput } from '@/shared/types/product.interface'

interface IProductFormProps {
  product: IProduct | null
  categories: ICategory[]
  colors: IColor[]
}

const ProductForm = ({ product, categories, colors }: IProductFormProps) => {
  const { createProduct, isLoadingCreate } = useCreateProduct()
  const { updateProduct, isLoadingUpdate } = useUpdateProduct()
  const { deleteProduct, isLoadingDelete } = useDeleteProduct()

  const title = product ? 'Изменить данные' : 'Создать товар'
  const description = product ? 'Изменить данные о товаре' : 'Добавить новый товар в магазин'
  const action = product ? 'Сохранить' : 'Создать'
  const disabled = isLoadingCreate || isLoadingUpdate

  // описываем поля для формы с значениями
  const form = useForm<IProductInput>({
    mode: 'onChange',
    // values это начальные значения в форме
    // values даёт контролируемую синхронизацию с внешним state (удобно, когда данные асинхронно приходят и вы хотите, чтобы форма обновлялась автоматически).
    values: {
      title: product?.title || '',
      description: product?.description || '',
      images: product?.images || [],
      price: product?.price || 0,
      categoryId: product?.category.id || '',
      colorId: product?.color.id || '',
    },
  })

  const onSubmit: SubmitHandler<IProductInput> = (data) => {
    // переводим price строку в число
    data.price = Number(data.price)
    // если у нас есть продукт тогда проводим мутацию на обновления данных
    if (product) updateProduct(data)
    // иначе создаем мутацию на создания товара
    else createProduct(data)
  }

  return (
    <div className="wrapper p-6">
      <div className="header gap-4 h-full flex items-center justify-between border-b pb-4">
        <Heading title={title} description={description} />
        {/* если есть продукт показываем кнопку на удаление */}
        {product && (
          <ConfirmModal handleClick={() => deleteProduct()}>
            <Button size="icon" variant="primary" disabled={isLoadingDelete}>
              <Trash className="size-4" />
            </Button>
          </ConfirmModal>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* images upload */}
          <FormField
            control={form.control}
            name="title"
            rules={{
              required: 'Название товара',
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введите название товара"
                    disabled={disabled}
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            rules={{
              required: 'Цена обязательна',
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Цена</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Цена товара"
                    disabled={disabled}
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            rules={{
              required: 'Категория обязательна',
            }}
            render={({ field: { onChange, value } }) => (
              <FormItem>
                <FormLabel>Категория</FormLabel>
                <Select disabled={disabled} value={value} onValueChange={onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Категория товара" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="colorId"
            rules={{
              required: 'Цвет обязателен',
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Цвет</FormLabel>
                <Select disabled={disabled} value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Цвет товара" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            rules={{
              required: 'Описание обяательно',
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Textarea placeholder="Описание товара" disabled={disabled} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="primary" disabled={disabled}>
            {action}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ProductForm
