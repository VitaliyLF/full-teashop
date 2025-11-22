'use client'

import { useRouter } from 'next/navigation'
import { MouseEventHandler } from 'react'
import { FaYandex } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/Button'

import { SERVER_URL } from '@/config/api.config'

const AuthSocial = () => {
  // это нужно для переадрессации после авторизации через яндекс гугл
  const router = useRouter()

  const redirectToAuth = (provider: string): MouseEventHandler<HTMLButtonElement> => {
    // всегда должно тогда возвращать функцию или в onClick вызывать функцию и передавать функцию redirectToAuth
    // () => redirectToAuth('')
    return () => router.push(`${SERVER_URL}/auth/${provider}`)
  }

  return (
    <div className="space-y-3 mb-2">
      <Button className="w-full" variant="outline" onClick={redirectToAuth('google')}>
        <FcGoogle className="size-5 mr-3" />
        Продолжить через Google
      </Button>

      <Button className="w-full" variant="outline" onClick={redirectToAuth('yandex')}>
        <FaYandex className="size-5 mr-3" color="#FC3F1D" />
        Продолжить через Яндекс
      </Button>
    </div>
  )
}

export default AuthSocial
