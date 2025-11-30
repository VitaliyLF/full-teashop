'use client'
import { Trash } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
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

import { useCreateCategory } from '@/hooks/queries/categories/useCreateCategory'
import { useDeleteCategory } from '@/hooks/queries/categories/useDeleteCategory'
import { useUpdateCategory } from '@/hooks/queries/categories/useUpdateCategory'

import { ICategory, ICategoryInput } from '@/shared/types/category.interface'

interface ICategoryFormProps {
  category?: ICategory
}

const CategoryForm = ({ category }: ICategoryFormProps) => {
  const { createCategory, isLoadingCreate } = useCreateCategory()
  const { updateCategory, isLoadingUpdate } = useUpdateCategory()
  const { deleteCategory, isLoadingDelete } = useDeleteCategory()

  const title = category ? 'Изменить данные' : 'Создать категорию'
  const description = category
    ? 'Изменить данные о категории'
    : 'Добавить новую категорию в магазин'
  const action = category ? 'Сохранить' : 'Создать'
  const disabled = isLoadingCreate || isLoadingUpdate

  const form = useForm<ICategoryInput>({
    mode: 'onChange',
    values: category,
  })

  const onSubmit: SubmitHandler<ICategoryInput> = (formData) => {
    if (category) {
      updateCategory(formData)
    } else {
      createCategory(formData)
    }
  }

  return (
    <div className="wrapper p-6">
      <div className="header gap-4 h-full flex items-center justify-between border-b pb-4">
        <Heading title={title} description={description} />
        {category && (
          <ConfirmModal handleClick={() => deleteCategory()}>
            <Button size="icon" variant="primary" disabled={isLoadingDelete}>
              <Trash className="size-4" />
            </Button>
          </ConfirmModal>
        )}
      </div>
      <Form {...form}>
        <form className="mt-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            rules={{
              required: 'Название Обязательно',
            }}
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input
                    className="max-w-[300px]"
                    placeholder="Введите название категории"
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
            name="description"
            rules={{
              required: 'Описание Обязательно',
            }}
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Описание категории" disabled={disabled} />
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

export default CategoryForm
