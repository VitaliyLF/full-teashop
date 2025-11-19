import { Album, DollarSign, FolderKanban, LucideIcon, Star } from 'lucide-react'

// можно описать еще так
// Record — это служебный тип в TypeScript, который позволяет описать объект с заранее известными ключами и значениями определённого типа.
// Record<KeyType, ValueType>
// "Создай объект, где ВСЕ ключи — типа KeyType, а ВСЕ значения — типа ValueType."
// const icons: Record<number, LucideIcon> = {
//   1: DollarSign,
//   2: FolderKanban,
//   3: Album,
//   4: Star,
// }

// export const getIcon = (id: number): LucideIcon => {
//   return icons[id] ?? DollarSign
// }

export const getIcon = (id: number): LucideIcon => {
  switch (id) {
    case 1:
    default:
      return DollarSign
    case 2:
      return FolderKanban
    case 3:
      return Album
    case 4:
      return Star
  }
}
