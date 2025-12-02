'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { Button } from '@/components/ui/Button'
import { DataTable } from '@/components/ui/data-table/DataTable'

import { useProfile } from '@/hooks/userProfile'

import { saveTokensStorage } from '@/services/auth/auth-token.services'
import { authService } from '@/services/auth/auth.services'

import { EnumOrderStatus } from '@/shared/types/order.interface'

import { formatDate } from '@/utils/date/format-date'
import { formatPrice } from '@/utils/string/format-price'

import { IOrderColumn, orderColumns } from '../(pages)/favorites/features/OrderColumns'

const Dashboard = () => {
  // обявляем хук useSearchParams
  const searchParams = useSearchParams()

  const router = useRouter()

  // получаем юзера
  const { user } = useProfile()

  useEffect(() => {
    // с помощью useSearchParams забираем query параметр accessToken
    const accessToken = searchParams.get('accessToken')

    // если есть такой параметр прокидываем query accessToken в функцию которая сохраняет его в storage
    if (accessToken) saveTokensStorage(accessToken)

    // useEffect срабатывает лишь при изменении searchParams
  }, [searchParams])

  // Делаем мутацию
  const { mutate: logout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess: () => router.push('/auth'),
  })

  if (!user) return null

  const formattedOrders: IOrderColumn[] = user.orders.map((order) => ({
    createAt: formatDate(order.createdAt),
    status: order.status === EnumOrderStatus.PENDING ? 'В ожидании' : 'Оплачен',
    total: formatPrice(order.total),
  }))

  return (
    <div className="my-6">
      <div className="header flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold"></h1>
        <Button variant="ghost" onClick={() => logout()}>
          <LogOut className="size-4" />
          Выйти
        </Button>
      </div>
      <DataTable columns={orderColumns} data={formattedOrders} />
    </div>
  )
}

export default Dashboard
