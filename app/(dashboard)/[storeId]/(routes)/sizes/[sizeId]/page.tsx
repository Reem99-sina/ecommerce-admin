import prismadb from "@/lib/prismadb"
import {  SizeForm } from "./components/size-form"

const SizePage=async({params}:{params:{sizeId:string,storeId:string}})=>{
    const size =params.sizeId!="new"?await prismadb.size.findUnique({
        where:{
            id:params.sizeId
        }
    }):null
    const sizes =await prismadb.size.findMany({
        where:{
            storeId:params.storeId
        }
    })
return(
    <>
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8">
            <SizeForm initialData={size} />
        </div>
    </div>
    </>
)
}
export default SizePage