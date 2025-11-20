import { ILastUsers } from '@/shared/types/statistics.interface'

interface LastUsersProps {
  data: ILastUsers[]
}

const LastUsers = ({ data }: LastUsersProps) => {
  return (
    <div className="user flex items-center mt-5">
      <div className="">LastUsers</div>
      {/* <img className="rounded-full" src="" alt="" /> */}
      <div className="info ml-4 space-y-1 text-sm text-muted-foreground">
        <p className="name leading-none"></p>
      </div>
      <div className="total ml-auto font-medium"></div>
    </div>
  )
}

export default LastUsers
