import prismadb from "@/lib/prismadb"
import {  ColorForm } from "./components/color-form"

const ColorPage=async({params}:{params:{colorId:string,storeId:string}})=>{
    const color =await prismadb.color.findUnique({
        where:{
            id:params.colorId
        }
    })
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