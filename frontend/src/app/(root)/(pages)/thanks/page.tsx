import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'

import { PUBLIC_URL } from '@/config/url.config'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Спасибо за покупку',
  ...NO_INDEX_PAGE,
}

const ThanksPage = () => {
  return (
    <div className="my-24 py-20 mx-auto text-center flex flex-col items-center max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Спасибо за покупку</h1>
      <p className="description mt-6 text-lg text-muted-foreground">
        Спасибо за ваш заказ! Мы ценим ваше доверие и приложим все усилия чтобы доставить ваш заказ
        как можно скорей
      </p>
      <Link className="mt-6" href={PUBLIC_URL.home()}>
        <Button variant="primary">
          На главную
          <ArrowRight />
        </Button>
      </Link>
    </div>
  )
}

export default ThanksPage
