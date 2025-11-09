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

import { useAuthForm } from './hook/useAuthForm'

const Auth = () => {
  // состояние для проверки формы какого она типа
  const [isReg, setIsReg] = useState(false)

  // подключаем кастомный хук и берем нужные вещи из него
  const { onSubmit, form, isPending } = useAuthForm(isReg)

  const toggleAuthMode = () => setIsReg(!isReg)

  return (
    <div className="">
      <div className="">
        <Image src="/images/auth.svg" alt="TeaShop auth" width={100} height={100} />
      </div>
      <div className="">
        <Card className="">
          <CardHeader className="">
            <CardTitle className="">{isReg ? 'Создать аккаунт' : 'Войти в аккаунт'}</CardTitle>
            <CardDescription className="">
              Войдите или создайте учетную запись,чтобы оформлять покупки!
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            {/* Разворачиваем нашу form из хука  */}
            <Form {...form}>
              {/* из библиотеки реакт форм мы вызываем метод handleSubmit и прокидываем нашу функцию */}
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Auth fileds */}

                <Button disabled={isPending}>{isReg ? 'Создать' : 'Авторизоваться'}</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            {isReg ? 'Уже есть аккаунт' : 'Еще нет аккаунта'}
            <Button onClick={toggleAuthMode}>{isReg ? 'Войти' : 'Создать'}</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Auth
