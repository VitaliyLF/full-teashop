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

import { useDeleteStore } from '@/hooks/queries/store/useDeleteStore'
import { useUpdateStore } from '@/hooks/queries/store/useUpdateStore'

import { IStoreUpdate } from '@/shared/types/store.interface'

interface ISettingsProps {}

const Settings = ({}: ISettingsProps) => {
  const { store, updateStore, isLoadingUpdate } = useUpdateStore()
  const { deleteStore, isLoadingDelete } = useDeleteStore()

  // инициализируем нашу форму с поля по дефолту
  const form = useForm<IStoreUpdate>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
    },
    // также указываем значение по умолчанию грубо говоря чтобы всегда было после рендера
    values: {
      title: store?.title || '',
      description: store?.description || '',
    },
  })

  // обработчик для формы
  const onSubmit: SubmitHandler<IStoreUpdate> = (data) => {
    updateStore(data)
  }

  return (
    <div className="wrapper p-6">
      <div className="header gap-4 h-full flex items-center justify-between border-b pb-4">
        <Heading title="Настройки магазина" description="Управление настройками магазина" />
        <ConfirmModal handleClick={() => deleteStore()}>
          <Button size="icon" variant="primary" disabled={isLoadingDelete}>
            <Trash className="size-4" />
          </Button>
        </ConfirmModal>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="fields flex flex-col gap-4 mt-4">
            <FormField
              // подключаем сюда то что за форма
              // в react hook form есть control
              control={form.control}
              // указываем имя поля
              name="title"
              rules={{
                // указываем правила для поля
                required: 'Название обязательно',
              }}
              // то что будет рендериться какие инпуты формы
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    {/* выше это все библиотеки и разворациваем field на инпут */}
                    <Input placeholder="Название магазина" disabled={isLoadingUpdate} {...field} />
                  </FormControl>
                  {/* для вывода ошибки */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    {/* выше это все библиотеки и разворациваем field на инпут */}
                    <Textarea
                      placeholder="Описание магазина"
                      disabled={isLoadingUpdate}
                      {...field}
                    />
                  </FormControl>
                  {/* для вывода ошибки */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-fit" variant="primary" disabled={isLoadingUpdate}>
              Сохранить
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Settings
