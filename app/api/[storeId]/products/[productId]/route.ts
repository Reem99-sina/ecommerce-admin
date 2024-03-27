import {auth} from "@clerk/nextjs"
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
export async function GET(_req:Request,{params}:{params:{productId:string}}){
    try{
        if(!params.productId){
        return new NextResponse("product Id is requied",{status:401})
        }
        const product=await prismadb.product.findUnique({
            where:{
                id:params.productId
            },include:{
                images:true,
                category:true,
                color:true,
                size:true
            }
        })
       
        return NextResponse.json(product) 
    }catch(error){
        console.log(error)
        return new NextResponse("internal error",{status:500})
    }
}
export async function PATCH(req:Request,{params}:{params:{storeId:string,productId:string}}){
    try{
        const {userId}=auth()
        const body=await req.json()
    
    const {name, categoryId, sizeId, colorId, price, images, isFeatured, isArchived}= body
        if(!userId){
            console.log(userId,"userId")
        return new NextResponse("unauthorized",{status:401})
        
        }
        if(!params.storeId){
            // console.log(userId,"userId")
        return new NextResponse("store id is requied",{status:401})
        
        }
        if(!params.productId){
            // console.log(userId,"userId")
        return new NextResponse("product Id is requied",{status:401})
        
        }
        const store=await prismadb.store.findFirst({
            where:{
                id:params?.storeId,
                userId
            }
        })
        if(!store){
        return new NextResponse("unauthorized",{status:403})
    
        }
        
        await prismadb.product.update({
            where:{
                id:params.productId       
             },
                data:{
                    name, categoryId, sizeId, colorId, price:String(price), images:{deleteMany:{}}, isFeatured, isArchived
            }
        })
        const product=await prismadb.product.update({
            where:{
                id:params.productId       
             },data:{
                    images:{createMany:{
                        data:[
                            ...images.map((ele:{url:string})=>ele)
                        ]
                    }}
            }
        })
        return NextResponse.json(product)

    }catch(error){
        return new NextResponse("internal error",{status:500})

    }
    
    
    
}
export async function DELETE(_req:Request,{params}:{params:{storeId:string,productId:string}}){
    try{
        const {userId}=auth()
   
        if(!userId){
            // console.log(userId,"userId")
        return new NextResponse("unauthorized",{status:401})
        
        }
        const store=await prismadb.store.findFirst({
            where:{
                id:params?.storeId,
                userId
            }
        })
        if(!store){
        return new NextResponse("unauthorized",{status:403})
    
        }
        
        if(!params.productId){
            // console.log(userId,"userId")
        return new NextResponse("product id is requied",{status:401})
        
        }
        const product=await prismadb.product.deleteMany({
            where:{
                id:params.productId
            }
        })
        return NextResponse.json(product)

    }catch(error){
        return new NextResponse("internal error",{status:500})

    }
  
}