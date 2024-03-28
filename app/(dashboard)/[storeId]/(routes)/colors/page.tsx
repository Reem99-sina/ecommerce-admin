import prismadb from "@/lib/prismadb"
import { ColorClient } from "./components/client"
import { ColorsColumn } from "./components/columns"
import {format} from "date-fns"
const ColorsPage=async({params}:{params:{storeId:string}})=>{
   
    const Colors=await prismadb.color.findMany({
        where:{
            storeId:params.storeId
        },orderBy:{
            createdAt:"desc"
        }
    })
  
    const FormatedColor:ColorsColumn[]=Colors?.map((ele)=>({
        id:ele.id,
        name:ele.name,
        value:ele.value,
        createdAt:format(ele.createdAt,"MMMM do , yyyy")
    }))
    return(<div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={FormatedColor}/>
        </div>
    </div>

    )
}
export default ColorsPage