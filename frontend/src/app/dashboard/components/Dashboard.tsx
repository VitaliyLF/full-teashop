'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { saveTokensStorage } from '@/services/auth/auth-token.services'

const Dashboard = () => {
  // обявляем хук useSearchParams
  const searchParams = useSearchParams()

  useEffect(() => {
    // с помощью useSearchParams забираем query параметр accessToken
    const accessToken = searchParams.get('accessToken')

    // если есть такой параметр прокидываем query accessToken в функцию которая сохраняет его в storage
    if (accessToken) saveTokensStorage(accessToken)

    // useEffect срабатывает лишь при изменении searchParams
  }, [searchParams])

  return (
    <div className="">
      <div className="">Dashboard</div>
    </div>
  )
}

export default Dashboard
