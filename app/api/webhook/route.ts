import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req:Request){
    const body=await req.text()
    const signature=headers().get("Stripe-Signature") as string
    let event:Stripe.Event
    try{
        event=stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.CLERK_SECRET_KEY!
        )
    }catch(error:any){
        return new NextResponse(`webhook error ${error.message}`,{status:400})
    }
    const session =event.data.object as Stripe.Checkout.Session
    const address= session?.customer_details?.address
    const addressComponent=[
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.postal_code,
        address?.country
    ]
    const addressString=addressComponent.filter((c)=>c!==null).join(", ")
    if(event.type=="checkout.session.completed"){
        const order=await prismadb.order.update({
            where:{
                id:session?.metadata?.orderId
            },
            data:{
                isPaid:true,
                address:addressString,
                phone:session?.customer_details?.phone||"",

            },include:{
                orderItems:true
            }
        })
        const productsId=order.orderItems.map((orderItem)=>orderItem.productId)
        await prismadb.product.updateMany({
            where:{
                id:{in:[...productsId]}
            },data:{
                isArchived:true
            }
        })
    }
    return new NextResponse(null,{status:200})
}