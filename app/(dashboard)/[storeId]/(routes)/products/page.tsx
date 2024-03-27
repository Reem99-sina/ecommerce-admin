import prismadb from "@/lib/prismadb"
import { ProductClient } from "./components/client"
import { ProductColumns } from "./components/columns"
import {format} from "date-fns"
import { formatter } from "@/lib/utils"
const ProductsPage=async({params}:{params:{storeId:string}})=>{
    const products=await prismadb.product.findMany({
        where:{
            storeId:params.storeId
        },include:{
            category:true,
            size:true,
            color:true
        },
        orderBy:{
            createdAt:"desc"
        }
    })
    const FormatedProduct:ProductColumns[]=products?.map((ele)=>({
        id:ele.id,
        name:ele.name,
        isFeatured:ele.isFeatured,
        isArchived:ele.isArchived,
        price:formatter.format(Number(ele.price)),
        category:ele.category.name,
        size:ele.size.name,
        color:ele.color.value,
        createdAt:format(ele.createdAt,"MMMM do , yyyy")
    }))
    return(<div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={FormatedProduct}/>
        </div>
    </div>

    )
}
export default ProductsPage