import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'

import { PUBLIC_URL } from '@/config/url.config'

import { SITE_DESCRIPTION } from '@/constants/seo.constants'

const Hero = () => {
  return (
    <div className="section my-24 py-20 mx-auto text-center flex flex-col items-center max-w-4xl">
      <h1 className="heading text-4xl font-bold tracking-tight md:text-5xl">
        Ваш шоппинг, ваше удовольствие - <span className="text-blue-600">все в одном месте</span>
      </h1>
      <p className="description mt-6 text-lg text-muted-foreground">{SITE_DESCRIPTION}</p>
      <Link href={PUBLIC_URL.explorer()}>
        <Button className="mt-6 group" variant="primary">
          За покупками
          <ArrowRight className="size-4 ml-2 transition-all group-hover:ml-3" />
        </Button>
      </Link>
    </div>
  )
}

export default Hero
