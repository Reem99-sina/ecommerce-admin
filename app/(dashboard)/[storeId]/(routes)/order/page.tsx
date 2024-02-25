import prismadb from "@/lib/prismadb"
import { OrderClient } from "./components/client"
import { OrderColumns } from "./components/columns"
import {format} from "date-fns"
import { formatter } from "@/lib/utils"
const OrdersPage=async({params}:{params:{storeId:string}})=>{
   
    const orders=await prismadb.order.findMany({
        where:{
            storeId:params.storeId
        },include:{
            orderItems:{
                include:{
                    product:true
                }
            }
        },orderBy:{
            createdAt:"desc"
        }
    })
  
    const FormatedOrder:OrderColumns[]=orders?.map((ele)=>({
        id:ele.id,
        phone:ele.phone,
        address:ele.address,
        isPaid:ele.isPaid,
        products:ele.orderItems.map((item)=>item.product.name).join(", "),
        totalPrice:formatter.format(ele.orderItems.reduce((total,item)=>total+Number(item.product.price),0)),
        createdAt:format(ele.createdAt,"MMMM do , yyyy")
    }))
    return(<div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={FormatedOrder}/>
        </div>
    </div>

    )
}
export default OrdersPage