import { type PropsWithChildren, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useCreateStore } from '@/hooks/queries/store/useCreateStore'

import { IStoreCreate } from '@/shared/types/store.interface'

import { Button } from '../Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../Dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form-elements/Form'
import { Input } from '../form-elements/Input'

// типизируем детей вот так
// будет использовать компонент из shadcn Dialog
const CreateStoreModal = ({ children }: PropsWithChildren<unknown>) => {
  // Открыто закрыто
  // это состояние нужно чтобы при создании магазина модалка скрывалась
  const [isOpen, setIsOpen] = useState(false)

  const { createStore, isLoadingCreateStore } = useCreateStore()

  // инициализируем форму
  const form = useForm<IStoreCreate>({
    mode: 'onChange',
  })

  // обработчик для формы сабмит
  const onSubmit: SubmitHandler<IStoreCreate> = (data) => {
    // это mutate который принимает data данные из формы
    createStore(data)
    // закрываем модалку
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* DialogTrigger кнопка по нажатию на которую открывается модалка */}
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создание магазина</DialogTitle>
          <DialogDescription>Для создания магазина необходимо указать название.</DialogDescription>
        </DialogHeader>
        {/* Компоненты формы */}
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              // подключаем сюда form
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
                    <Input
                      placeholder="Введите название магазина"
                      disabled={isLoadingCreateStore}
                      {...field}
                      // всегда нужно либо в форме указывать defaultValues для полей или так
                      // потому что так мы их делаем контролируемыми при первом рендере
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  {/* для вывода ошибки */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex  justify-end">
              <Button variant="primary" disabled={isLoadingCreateStore}>
                Создать
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateStoreModal
