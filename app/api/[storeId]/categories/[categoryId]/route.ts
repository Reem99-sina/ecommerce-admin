import {auth} from "@clerk/nextjs"
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
export async function GET(_req:Request,{params}:{params:{categoryId:string}}){
    try{
        if(!params.categoryId){
        return new NextResponse("category id is requied",{status:401})
        }
        const category=await prismadb.category.findUnique({
            where:{
                id:params.categoryId
            },include:{
                billboard:true
            }
        })
        // console.log(category,"category")
        return NextResponse.json(category)
    }catch(error){
        return new NextResponse("internal error",{status:500})

    }
    
}
export async function PATCH(req:Request,{params}:{params:{storeId:string,categoryId:string}}){
    try{
        const {userId}=auth()
        const body=await req.json()
    
    const {name,billboardId}= body
        if(!userId){
            // console.log(userId,"userId")
        return new NextResponse("unauthorized",{status:401})
        
        }
        if(!params.storeId){
            // console.log(userId,"userId")
        return new NextResponse("store id is requied",{status:401})
        
        }
        if(!params.categoryId){
            // console.log(userId,"userId")
        return new NextResponse("billboard id is requied",{status:401})
        
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
        
        const category =await prismadb.category.updateMany({
            where:{
                id:params.categoryId        },data:{
                name,billboardId
            }
        })

            return NextResponse.json(category)
        
    }catch(error){
        return new NextResponse("internal error",{status:500})

    }
   
}
export async function DELETE(_req:Request,{params}:{params:{storeId:string,categoryId:string}}){
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
        
        if(!params.categoryId){
            // console.log(userId,"userId")
        return new NextResponse("category id is requied",{status:401})
        
        }
       const category= await prismadb.category.deleteMany({
            where:{
                id:params.categoryId
            }
        })
        return NextResponse.json(category)
        
    }catch(error){
        return new NextResponse("internal error",{status:500})

    }
  
}