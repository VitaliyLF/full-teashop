import Image from 'next/image'
import Link from 'next/link'

import { PUBLIC_URL } from '@/config/url.config'

import { SITE_NAME } from '@/constants/seo.constants'

import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      className={cn('logo flex items-center gap-3 hover:opacity-75 transition-opacity', className)}
      href={PUBLIC_URL.home()}>
      <Image src="/images/logo.svg" alt={`${SITE_NAME} лого`} width={35} height={35} />
      <div className="text-2xl font-bold text-blue-600">{SITE_NAME}</div>
    </Link>
  )
}

export default Logo
