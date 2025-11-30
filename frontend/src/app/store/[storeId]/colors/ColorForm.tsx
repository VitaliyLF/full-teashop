'use client'
import { Trash } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
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

import { useCreateColor } from '@/hooks/queries/colors/useCreateColor'
import { useDeleteColor } from '@/hooks/queries/colors/useDeleteColor'
import { useUpdateColor } from '@/hooks/queries/colors/useUpdateColor'

import { IColor, IColorInput } from '@/shared/types/color.interface'

interface IColorFormProps {
  color?: IColor
}

const ColorForm = ({ color }: IColorFormProps) => {
  const { createColor, isLoadingCreate } = useCreateColor()
  const { updateColor, isLoadingUpdate } = useUpdateColor()
  const { deleteColor, isLoadingDelete } = useDeleteColor()

  const title = color ? 'Изменить данные' : 'Создать цвет'
  const description = color ? 'Изменить данные о цвете' : 'Добавить новый цвет в магазин'
  const action = color ? 'Сохранить' : 'Создать'
  const disabled = isLoadingCreate || isLoadingUpdate

  const form = useForm<IColorInput>({
    mode: 'onChange',
    values: {
      name: color?.name || '',
      value: color?.value || '',
    },
  })

  const onSubmit: SubmitHandler<IColorInput> = (formData) => {
    if (color) {
      updateColor(formData)
    } else {
      createColor(formData)
    }
  }

  return (
    <div className="wrapper p-6">
      <div className="header gap-4 h-full flex items-center justify-between border-b pb-4">
        <Heading title={title} description={description} />
        {color && (
          <ConfirmModal handleClick={() => deleteColor()}>
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
            name="name"
            rules={{
              required: 'Название обязательно',
            }}
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Название цвета</FormLabel>
                <FormControl>
                  <Input
                    className="max-w-[300px]"
                    placeholder="Введите название цвета"
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
            name="value"
            rules={{
              required: 'Значение обязательно',
            }}
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Значение</FormLabel>
                <FormControl>
                  <Input
                    className="max-w-[300px]"
                    placeholder="Введите значение товара"
                    disabled={disabled}
                    {...field}
                    value={field.value ?? ''}
                  />
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

export default ColorForm
