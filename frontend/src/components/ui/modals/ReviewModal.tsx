'use client'

import { PropsWithChildren, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Rating } from 'react-simple-star-rating'

import { useCreateReview } from '@/hooks/queries/reviews/useCreateReview'

import { IReviewInput } from '@/shared/types/review.interface'

import { Button } from '../Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../Dialog'
import { Textarea } from '../Textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form-elements/Form'

interface IReviewModalProps {
  storeId: string
}

const ReviewModal = ({ children, storeId }: PropsWithChildren<IReviewModalProps>) => {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<IReviewInput>({
    mode: 'onChange',
  })

  const { createReview, isLoadingCreate } = useCreateReview(storeId)

  const onSubmit: SubmitHandler<IReviewInput> = (formData) => {
    // отправляем данные
    createReview(formData)
    // отчищаем форму
    form.reset()
    // Закрываем модалку
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создать отзыв</DialogTitle>
          <DialogDescription>
            Для создания отзыва необходимо указать рейтинг и текст
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="rating"
              rules={{
                required: 'Рейтинг обязателен',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Rating
                      onClick={field.onChange}
                      initialValue={field.value}
                      SVGstyle={{ display: 'inline-block' }}
                      size={20}
                      transition
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="text"
              rules={{
                required: 'Рейтинг обязателен',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Текст</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Текст отзыва" disabled={isLoadingCreate} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button variant="primary" disabled={isLoadingCreate}>
                Добавить
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewModal
