import { Card,CardHeader ,CardTitle,CardContent} from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DollarSign ,CreditCard,Package} from "lucide-react"
import {formatter} from "@/lib/utils"
import {getTotalRevenue} from "@/actions/get-revenue"
import {getSales} from "@/actions/get-sales"
import {Overview} from "@/components/overview"
import {getProductsCount} from "@/actions/get-products-count"
import {getGraph} from "@/actions/get-graph-revenue"
async function Dashboardpage({params}:{params:{storeId:string}}) {
  const totalRevenue=await getTotalRevenue(params.storeId)
  const sales=await getSales(params.storeId)
  const stocks=await getProductsCount(params.storeId)
  const graphs=await getGraph(params.storeId)
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6">
      <Heading title="Dashboard" description="overview of your store"/>
      <Separator/>
      <div className="grid gap-4 grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
            total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground"/>

            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
            Sales
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground"/>

            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(sales)}
              </div>
            </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
            products in the stock
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground"/>

            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(stocks)}
              </div>
            </CardContent>
        </Card>
      </div>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview data={graphs}/>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
export default Dashboardpage