import {SizesColumn}from "./columns"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {Edit,Copy,Trash, MoreHorizontal} from "lucide-react"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"

import { AlertModal } from "@/components/modals/alert-modal"
interface CellActionProps{
    data:SizesColumn
}
export const CellAction:React.FC<CellActionProps>=({data})=>{
        const router=useRouter()
        const params=useParams()
       let [loading,setLoading]= useState(false)
       let [open,setOpen]= useState(false)

    const onCopy=(id:string)=>{
        navigator.clipboard.writeText(id)
        toast.success("size id Copied to the clipboard")
    }
    const onDelete = async () => {
        setLoading(true)
        await axios.delete(`/api/${params.storeId}/sizes/${data.id}`).then((res) => {
            router.push(`/${params.storeId}/sizes`)
            router.refresh()
            toast.success("size deleted")

        }).catch((error) => {

            toast.error("make sure you removed all  products using this size first")
        }).finally(() => {
            setLoading(false)
            setOpen(false)
        })
    }
    return (
        <>
        <AlertModal isOpen={open} onClose={()=>setOpen(false)}onConfirm={onDelete}loading={loading}/>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">

                </span>
                <MoreHorizontal className="h-4 w-4"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel></DropdownMenuLabel>
            <DropdownMenuItem onClick={()=>router.push(`/${params.storeId}/sizes/${data?.id}`)}>
                <Edit className="mr-2 h-4 w-4"/>
                Update
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>onCopy(data?.id)}>
                <Copy className="mr-2 h-4 w-4"/>
                Copy
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setOpen(true)}>
                <Trash className="mr-2 h-4 w-4"/>
                delete
            </DropdownMenuItem>
            </DropdownMenuContent>
      </DropdownMenu>
      </>
    )
}