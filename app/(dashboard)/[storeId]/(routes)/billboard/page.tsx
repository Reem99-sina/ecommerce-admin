import prismadb from "@/lib/prismadb"
import { BillboardClient } from "./components/client"
import { BillBoardColumns } from "./components/columns"
import {format} from "date-fns"
const BillboardsPage=async({params}:{params:{storeId:string}})=>{
    const billboards=await prismadb.billboard.findMany({
        where:{
            storeId:params.storeId
        },orderBy:{
            createdAt:"desc"
        }
    })
    const FormatedBillboard:BillBoardColumns[]=billboards?.map((ele)=>({
        id:ele.id,
        label:ele.label,
        createdAt:format(ele.createdAt,"MMMM do , yyyy")
    }))
    return(<div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={FormatedBillboard}/>
        </div>
    </div>

    )
}
export default BillboardsPage