import Image from 'next/image'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

import { ILastUsers } from '@/shared/types/statistics.interface'

import { formatPrice } from '@/utils/string/format-price'

interface LastUsersProps {
  data: ILastUsers[]
}

const LastUsers = ({ data }: LastUsersProps) => {
  return (
    <Card>
      <CardHeader className="header flex flex-col items-stretch space-y-0 p-4 border-b">
        <CardTitle className="title text-xl font-medium tracking-[0.1px] line-clamp-1">
          Покупатели
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length ? (
          <ul>
            {data.map(({ id, picture, name, email, total }) => (
              <li key={id} className="user flex items-center mt-5">
                <Image className="rounded-full" width={40} height={40} src={picture} alt={name} />
                <div className="info ml-4 space-y-1 text-sm text-muted-foreground">
                  <p className="name leading-none text-black font-medium">{name}</p>
                  <p className="email leading-none">{email}</p>
                </div>
                <div className="total ml-auto font-medium">+{formatPrice(total)}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>У этого магазина нет покупателей</p>
        )}
      </CardContent>
    </Card>
  )
}

export default LastUsers
