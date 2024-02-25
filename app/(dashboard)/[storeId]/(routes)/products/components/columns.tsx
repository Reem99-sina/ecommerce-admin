"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumns = {
  id: string
  name: string
  price:string
  size:string
  category:string
  color:string
  isFeatured:boolean
  isArchived:boolean
  createdAt: string
}
 
export const columns: ColumnDef<ProductColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },{
    accessorKey: "color",
    header: "Color",
    cell:({row})=>(
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div className="h-6 w-6 rounded-full border"
        style={{backgroundColor:row.original.color}}
        >
        </div>
      </div>
    )
  },{
    accessorKey: "category",
    header: "Category",
  },{
    accessorKey: "size",
    header: "Size",
  },{
    accessorKey: "price",
    header: "Price",
  },{
    accessorKey: "isFeatured",
    header: "isFeatured",
  },{
    accessorKey: "isArchived",
    header: "isArchived",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },{
    id:"action",
    cell:({row})=><CellAction data={row.original}/>
  }
]