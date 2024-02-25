import prismadb from "@/lib/prismadb"
import { SizeClient } from "./components/client"
import { SizesColumn } from "./components/columns"
import {format} from "date-fns"
const SizesPage=async({params}:{params:{storeId:string}})=>{
   
    const sizes=await prismadb.size.findMany({
        where:{
            storeId:params.storeId
        },orderBy:{
            createdAt:"desc"
        }
    })
  
    const FormatedCategory:SizesColumn[]=sizes?.map((ele)=>({
        id:ele.id,
        name:ele.name,
        value:ele.value,
        createdAt:format(ele.createdAt,"MMMM do , yyyy")
    }))
    return(<div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={FormatedCategory}/>
        </div>
    </div>

    )
}
export default SizesPage