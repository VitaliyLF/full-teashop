// class-variance-authority (CVA) — это небольшая библиотека,
//  которая помогает удобно и безопасно управлять вариативными CSS-классами (например, Tailwind).
import { type VariantProps, cva } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

const iconVariants = cva('animate-spin text-blue-400', {
  // описываем варианты классов
  variants: {
    size: {
      default: 'size-9',
      sm: 'size-6',
    },
    // в качестве по дефолту указываем дефолт из variants строкой
    defaultVariants: {
      size: 'default',
    },
  },
})

type TypeIconVariants = VariantProps<typeof iconVariants>

const Loader = ({ size }: TypeIconVariants) => {
  return <LoaderCircle className={cn(iconVariants({ size }))} />
}

export default Loader
