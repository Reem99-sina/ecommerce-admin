import prismadb from "@/lib/prismadb"
import { CategoryClient } from "./components/client"
import { CategoriesColumn } from "./components/columns"
import {format} from "date-fns"
const CategoriesPage=async({params}:{params:{storeId:string}})=>{
    const categories=await prismadb.category.findMany({
        where:{
            storeId:params.storeId
        },include:{
            billboard:true
        },orderBy:{
            createdAt:"desc"
        }
    })
    const FormatedCategory:CategoriesColumn[]=categories?.map((ele)=>({
        id:ele.id,
        name:ele.name,
        billboardLabel:ele.billboard.label,
        createdAt:format(ele.createdAt,"MMMM do , yyyy")
    }))
    return(<div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={FormatedCategory}/>
        </div>
    </div>

    )
}
export default CategoriesPage