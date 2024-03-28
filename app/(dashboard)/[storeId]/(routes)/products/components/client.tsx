"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Billboard } from "@prisma/client"
import { Plus } from "lucide-react"
import { ProductColumns, columns } from "./columns"

import { useParams, useRouter } from "next/navigation"
import { DataTable } from "@/components/ui/data-tabel"
import { ApiList } from "@/components/ui/api-list"
 interface ProductProps{
    data:ProductColumns[]
 }
export const ProductClient:React.FC<ProductProps>=({data})=>{
    const router=useRouter()
    const params=useParams()
    return (<>
    <div className="flex items-center justify-between">
        <Heading title={`Products (${data.length})`} description="Manage products for your clients."/>
        <Button onClick={()=>router.push(`/${params.storeId}/products/new`)}>
            <Plus className="mr-2 h-4 w-4"/>
            Add New
        </Button>

    </div>
    <Separator/>
    <DataTable columns={columns}data={data} searchKey="name"/>
    <Heading title={`Api`} description="Api calls for products"/>
    <Separator/>
    <ApiList entityName="products" entityIdName={"productId"}/>
    </>)
}