// Миддлвер это что то в роде промежуточного ПО проверяем в данном случае авторизирован пользователь или нет
// В новых версиях Next js называется функция теперь proxy а не middleware
import { type NextRequest, NextResponse } from 'next/server'

import { PUBLIC_URL } from './config/url.config'
import { EnumTokens } from './services/auth/auth-token.services'

// если пользователь авторизирован и пытается перейти на страницу /auth то мы его перекидываем на страницу / главную
// а если он не авторизирован и пытается перейти на страницу /dashboard то мы его будем перекидывать на авторизацию
// еще так же можно делать и проверять на роли и делать что то кому то доступным

export const proxy = async (request: NextRequest) => {
  // лучше брать nextUrl вместо обычного url
  const { pathname } = request.nextUrl

  // из запроса в куки забираем по имени строки REFRESH_TOKEN и указываем именно что мы берем value куки
  const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value

  // тут при запросе если в Url присутствует /auth
  // тоже рабочий вариант
  // const isAuthPage = request.url.includes(PUBLIC_URL.auth())

  // лучше делать точную проверку
  const isAuthPage = pathname === PUBLIC_URL.auth()

  // если у нас запрос идет на  /auth страницу
  if (isAuthPage) {
    // если у нас есть рефреш токен
    // т.е если он авторизирован и пытается перейти на /auth то мы его редеректим на / домашнюю страницу
    // в ответе от сервера

    // new URL(pathOrAbsolute, base) в браузере / Node.js работает так:
    // Если первый аргумент — абсолютный URL (https://...), он используется как есть.
    // Если первый аргумент — относительный путь (например '/dashboard' или 'dashboard'), то он разрешается относительно базового URL (второй аргумент).
    // Результирующий URL берёт origin (протокол+домен+порт) от base, а путь — от первого аргумента (с учётом правил разрешения).
    // Следовательно, new URL('/', 'https://site.com/auth/login') → https://site.com/.

    // второй аргумент request.url это фулл домен а первый путь и склеевает в одно и возвращает домен/path
    if (refreshToken) {
      return NextResponse.redirect(new URL(PUBLIC_URL.home(), request.url))
    }

    // если же пользователь действительно не авторизован и пытается перейти на страницу авторизации то мы просто пропускаем его
    return NextResponse.next()
  }

  // если value refreshToken не найдено
  if (refreshToken === undefined) {
    // то переадресовываем его на страничку авторизации
    return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url))
  }

  // пользователь действительно авторизирован пропускаем его
  return NextResponse.next()
}

export const config = {
  // Тут указываем массив Url при котором будет сразабывать это middleware
  matcher: ['/dashboard/:path*', '/store/:path*', '/auth/:path*'],
}
