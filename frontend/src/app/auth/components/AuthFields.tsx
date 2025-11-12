import { UseFormReturn } from 'react-hook-form'

import { validEmail } from '@/shared/regex'
import { IAuthForm } from '@/shared/types/auth.interface'
import { FormControl, FormField, FormItem, FormMessage } from '@/shared/ui/form-elements/Form'
import { Input } from '@/shared/ui/form-elements/Input'

interface AuthFieldsProps {
  // то что пишеться в <> называется джинерики
  // все эти типы можно посмотреть когда вызываем хук и берем form
  form: UseFormReturn<IAuthForm, any, IAuthForm>
  isPending: boolean
  isReg?: boolean
}

const AuthFields = ({ form, isPending, isReg = false }: AuthFieldsProps) => {
  return (
    <>
      {isReg && (
        <FormField
          // подключаем сюда то что за форма
          // в react hook form есть control
          control={form.control}
          // указываем имя поля
          name="name"
          rules={{
            // указываем правила для поля
            required: 'Имя обязательно',
            maxLength: 100,
          }}
          // то что будет рендериться какие инпуты формы
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* выше это все библиотеки и разворациваем field на инпут */}
                <Input
                  placeholder="Иван"
                  disabled={isPending}
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
      )}
      <FormField
        // подключаем сюда то что за форма
        // в react hook form есть control
        control={form.control}
        // указываем имя поля
        name="email"
        rules={{
          // указываем правила для поля
          required: 'Почта обязательна',
          pattern: {
            value: validEmail,
            message: 'Введите валидный email',
          },
        }}
        // то что будет рендериться какие инпуты формы
        render={({ field }) => (
          <FormItem>
            <FormControl>
              {/* выше это все библиотеки и разворациваем field на инпут */}
              <Input placeholder="ivan@example.com" type="email" disabled={isPending} {...field} />
            </FormControl>
            {/* для вывода ошибки */}
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        // подключаем сюда то что за форма
        // в react hook form есть control
        control={form.control}
        // указываем имя поля
        name="password"
        rules={{
          // указываем правила для поля
          required: 'Пароль обязателен',
          minLength: {
            value: 6,
            message: 'Минимум 6 символов',
          },
        }}
        // то что будет рендериться какие инпуты формы
        render={({ field }) => (
          <FormItem>
            <FormControl>
              {/* выше это все библиотеки и разворациваем field на инпут */}
              <Input placeholder="******" type="password" disabled={isPending} {...field} />
            </FormControl>
            {/* для вывода ошибки */}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

export default AuthFields
