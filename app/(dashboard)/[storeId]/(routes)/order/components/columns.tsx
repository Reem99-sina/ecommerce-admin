"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumns = {
  id: string
  phone: string
  address:string
  isPaid:boolean
  totalPrice:string
  products:string
  createdAt: string
}
 
export const columns: ColumnDef<OrderColumns>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },{
    accessorKey: "address",
    header: "Address",
  },{
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  // {
  //   accessorKey: "address",
  //   header: "Value",
  //   cell:({row})=>(
  //     <div className="flex items-center gap-x-2">
  //       {row.original.value}
  //       <div className="h-6 w-6 rounded-full border"
  //       style={{backgroundColor:row.original.value}}
  //       >

  //       </div>
  //     </div>
  //   )
  // },
  {
    accessorKey: "isPaid",
    header: "Paid",
  }
]