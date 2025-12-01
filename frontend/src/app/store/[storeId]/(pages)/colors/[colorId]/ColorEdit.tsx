'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { colorService } from '@/services/color.services'

import ColorForm from '../ColorForm'

const ColorEdit = () => {
  const { colorId } = useParams<{ colorId: string }>()

  const { data } = useQuery({
    queryKey: ['get color'],
    queryFn: () => colorService.getById(colorId),
  })

  return <ColorForm color={data} />
}

export default ColorEdit
