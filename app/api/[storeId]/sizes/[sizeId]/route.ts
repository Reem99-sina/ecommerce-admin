import {auth} from "@clerk/nextjs"
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
export async function GET(_req:Request,{params}:{params:{sizeId:string}}){
    try{
        const {userId}=auth()
   
        if(!userId){
            // console.log(userId,"userId")
        return new NextResponse("unauthorized",{status:401})
        
        }
       
        
        if(!params.sizeId){
            // console.log(userId,"userId")
        return new NextResponse("size Id is requied",{status:401})
        
        }
        const size=await prismadb.size.findUnique({
            where:{
                id:params.sizeId
            }
        })
            return NextResponse.json(size)
       
    
        
    }catch(error){
        return new NextResponse("internal error",{status:500})

    }
    
}
export async function PATCH(req:Request,{params}:{params:{storeId:string,sizeId:string}}){
    try{
        const {userId}=auth()
        const body=await req.json()
    
    const {name,value}= body
        if(!userId){
            console.log(userId,"userId")
        return new NextResponse("unauthorized",{status:401})
        
        }
        if(!params.storeId){
            // console.log(userId,"userId")
        return new NextResponse("store id is requied",{status:401})
        
        }
        if(!params.sizeId){
            // console.log(userId,"userId")
        return new NextResponse("size Id is requied",{status:401})
        
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
        
        const size=await prismadb.size.updateMany({
            where:{
                id:params.sizeId        },data:{
                name,value
            }
        })
        return NextResponse.json(size)

    }catch(error){
        return new NextResponse("internal error",{status:500})

    }
    
    
    
}
export async function DELETE(_req:Request,{params}:{params:{storeId:string,sizeId:string}}){
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
        
        if(!params.sizeId){
            // console.log(userId,"userId")
        return new NextResponse("category id is requied",{status:401})
        
        }
        const size=await prismadb.size.deleteMany({
            where:{
                id:params.sizeId
            }
        })
        return NextResponse.json(size)

    }catch(error){
        return new NextResponse("internal error",{status:500})

    }
  
}