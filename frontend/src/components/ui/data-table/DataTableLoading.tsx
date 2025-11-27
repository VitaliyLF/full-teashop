import { Card, CardContent } from '../Card'
import Loader from '../Loader'
import { Skeleton } from '../Skeleton'

const DataTableLoading = () => {
  return (
    <div className="loading max-w-screen-2xl mx-auto w-full">
      <Skeleton className="heading h-8 w-48" />
      <Skeleton className="search h-8 w-72 mt-6" />
      <Card className="mt-6">
        <CardContent>
          <div className="loader-wrapper h-[520px] w-full flex items-center justify-center">
            <Loader />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DataTableLoading
