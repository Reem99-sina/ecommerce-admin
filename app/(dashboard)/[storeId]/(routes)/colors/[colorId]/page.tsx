import prismadb from "@/lib/prismadb"
import {  ColorForm } from "./components/color-form"

const ColorPage=async({params}:{params:{colorId:string,storeId:string}})=>{
    const color =params.colorId!="new"?await prismadb.color.findUnique({
        where:{
            id:params.colorId
        }
    }):null
    const colors =await prismadb.color.findMany({
        where:{
            storeId:params.storeId
        }
    })
return(
    <>
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8">
            <ColorForm initialData={color} />
        </div>
    </div>
    </>
)
}
export default ColorPage