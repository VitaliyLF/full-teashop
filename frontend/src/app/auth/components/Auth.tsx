'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card'
import { Form } from '@/components/ui/form-elements/Form'

import { useAuthForm } from '../hook/useAuthForm'

import AuthFields from './AuthFields'
import Social from './AuthSocial'

const Auth = () => {
  // состояние для проверки формы какого она типа
  const [isReg, setIsReg] = useState(false)

  // подключаем кастомный хук и берем нужные вещи из него
  const { onSubmit, form, isPending } = useAuthForm(isReg)

  const toggleAuthMode = () => setIsReg(!isReg)

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image src="/images/auth.svg" alt="TeaShop auth" width={100} height={100} />
      </div>
      <div className="h-full flex flex-col items-center justify-center">
        <Card className="border-none p-6 shadow-none w-[380px]">
          <CardHeader className="text-center pb-6">
            <CardTitle className="pb-1 text-3xl font-bold">
              {isReg ? 'Создать аккаунт' : 'Войти в аккаунт'}
            </CardTitle>
            <CardDescription>
              {isReg
                ? 'Создайте аккаунт для покупок!'
                : 'Войдите в учетную запись для оформления заказа'}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 w-full">
            {/* Разворачиваем нашу form из хука  */}
            <Form {...form}>
              {/* из библиотеки реакт форм мы вызываем метод handleSubmit и прокидываем нашу функцию */}
              <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                {/* Auth fields */}
                <AuthFields form={form} isPending={isPending} isReg={isReg} />

                <Button className="w-full mb-6" disabled={isPending}>
                  {isReg ? 'Регистрация' : 'Авторизоваться'}
                </Button>
              </form>
            </Form>
            <Social />
          </CardContent>
          <CardFooter className="p-0 text-sm gap-5 text-muted-foreground flex-col">
            {isReg ? 'Уже есть аккаунт' : 'Еще нет аккаунта?'}
            <Button className="w-full" variant="secondary" onClick={toggleAuthMode}>
              {isReg ? 'Войти' : 'Создать'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Auth
