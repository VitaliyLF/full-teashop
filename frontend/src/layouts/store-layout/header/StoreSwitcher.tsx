import { IStore } from '@/shared/types/store.interface'

// будет принимать items это массив наших магазинов
interface StoreSwitcherProps {
  items: IStore[]
}

const StoreSwitcher = ({ items }: StoreSwitcherProps) => {
  return (
    <div className="">
      <div className="">StoreSwitcher</div>
    </div>
  )
}

export default StoreSwitcher
