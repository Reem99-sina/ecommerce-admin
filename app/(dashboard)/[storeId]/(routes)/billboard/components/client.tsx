"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Billboard } from "@prisma/client"
import { Plus } from "lucide-react"
import { BillBoardColumns, columns } from "./columns"

import { useParams, useRouter } from "next/navigation"
import { DataTable } from "@/components/ui/data-tabel"
import { ApiList } from "@/components/ui/api-list"
 interface BillboardProps{
    data:BillBoardColumns[]
 }
export const BillboardClient:React.FC<BillboardProps>=({data})=>{
    const router=useRouter()
    const params=useParams()
    return (<>
    <div className="flex items-center justify-between">
        <Heading title={`billboards (${data.length})`} description="Manage billboards  for your clients."/>
        <Button onClick={()=>router.push(`/${params.storeId}/billboard/new`)}>
            <Plus className="mr-2 h-4 w-4"/>
            Add New
        </Button>

    </div>
    <Separator/>
    <DataTable columns={columns}data={data} searchKey="label"/>
    <Heading title={`Api`} description="Api calls for billboards"/>
    <Separator/>
    <ApiList entityName="billboards" entityIdName={"billboardId"}/>
    </>)
}