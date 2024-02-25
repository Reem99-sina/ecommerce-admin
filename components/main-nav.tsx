"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname,useParams } from "next/navigation"
import React from "react"

function MainNav({
    className,...props
}:React.HTMLAttributes<HTMLElement>) {
    const pathname=usePathname()
    const params=useParams()
    const routes=[{
        href:`/${params.storeId}/settings`,
        label:"Settings",
        active:pathname===`/${params.storeId}/settings`
    },{
        href:`/${params.storeId}`,
        label:"overview",
        active:pathname===`/${params.storeId}`
    },{
        href:`/${params.storeId}/billboard`,
        label:"Billboards",
        active:pathname===`/${params.storeId}/billboard`
    },{
        href:`/${params.storeId}/products`,
        label:"Products",
        active:pathname===`/${params.storeId}/products`
    },{
        href:`/${params.storeId}/sizes`,
        label:"Sizes",
        active:pathname===`/${params.storeId}/sizes`
    },{
        href:`/${params.storeId}/colors`,
        label:"Colors",
        active:pathname===`/${params.storeId}/colors`
    },{
        href:`/${params.storeId}/categories`,
        label:"Categories",
        active:pathname===`/${params.storeId}/categories`
    },{
        href:`/${params.storeId}/order`,
        label:"order",
        active:pathname===`/${params.storeId}/order`
    }]
  return (
   <nav className={cn("flex items-center space-x-4 lg:space-x-6",className)}>
{routes.map((route)=>(
    <Link href={route.href} key={route.href}className={cn("text-sm font-medium transition-colors hover:text-primary",
    route.active?"text-black dark:text-white":"text-muted-foreground")}>{route.label}</Link>
))}
   </nav>
  )
}
export default MainNav