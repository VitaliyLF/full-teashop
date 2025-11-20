import { IMonthlySales } from '@/shared/types/statistics.interface'

interface OverviewProps {
  data: IMonthlySales[]
}

const Overview = ({ data }: OverviewProps) => {
  return (
    <div className="">
      <div className="">Overview</div>
    </div>
  )
}

export default Overview
