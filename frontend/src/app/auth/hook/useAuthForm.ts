// хук для авторизации
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { DASHBOARD_URL } from '@/config/url.config'

import { authService } from '@/services/auth/auth.services'

import { IAuthForm } from '@/shared/types/auth.interface'

// принимает в себя параметр
// это форма авторизации или регистрации
export const useAuthForm = (isReg: boolean) => {
  // хук из next js для работы с роутом нужно для переадресации
  const router = useRouter()

  // инициализация нашей формы с помощью библиотеки react-hook-form
  // идем вместе с комопнентом form из shadcn
  // указываем типизацию
  const form = useForm<IAuthForm>({
    // валидация происходит прям во время ввода в форме
    mode: 'onChange',
    // всегда лучше ставить дефолтные значения на поля инпута потому что реакт любит чтобы инпуты был контролируемые
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  // запрос на мутацию из реакт квери
  // Забираем mutate и состояние isPending
  // isPending состояние чтобы делать недоступные кнопки при загрузки формы
  const { mutate, isPending } = useMutation({
    // по такому ключу идет
    mutationKey: ['auth user'],
    // mutationFn главная функция через которую отправляется запрос
    // принимает данные из формы и вызываем нашу функцию main в нее прокидываем первым параметром query и сами данные
    mutationFn: (data: IAuthForm) => authService.main(isReg ? 'register' : 'login', data),
    // обработка что будет происходит при успешном запросе
    onSuccess() {
      // обновляем поля у формы
      form.reset()
      // выводим тост уведомление
      toast.success('Успешная авторизация')
      // в самом конце обращаемся к роутеру и переадресовываем пользователя на страницу дашборда
      // можно переводить на главную

      // мы ввели данные в поля отправился запрос на сервер там записалось в бд и пришел ответ с сервера с данными об создании юзера
      // потом акцес токен и рефреш токен записываются в куки и потом нас редеректит на страницу DASHBOARD_URL
      router.replace(DASHBOARD_URL.home())
    },
    // При ошибке запроса при вводе в форму
    onError(error) {
      // если есть сообщение тогда выводим его в тостер или выводим захаркоженное значение
      if (error.message) {
        toast.error(error.message)
      } else {
        toast.error('Ошибка при авторизации')
      }
    },
  })

  // функция обработки формы принимает данные и обрабатывается
  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    mutate(data)
  }

  // возвращаем из хука
  return { onSubmit, form, isPending }
}
