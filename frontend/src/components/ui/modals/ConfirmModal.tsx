import { PropsWithChildren } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../AlertDialog'

interface IConfirmModalProps {
  handleClick: () => void
}

const ConfirmModal = ({ children, handleClick }: PropsWithChildren<IConfirmModalProps>) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены ?</AlertDialogTitle>
          <AlertDialogDescription>Это действие нельзя отменить.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Закрыть</AlertDialogCancel>
          <AlertDialogAction
            className="bg-blue-500 hover:bg-blue-500/50 rounded-lg p-4"
            onClick={() => handleClick()}>
            Продолжить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmModal
