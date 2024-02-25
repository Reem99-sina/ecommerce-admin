import {auth} from "@clerk/nextjs"
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
export async function GET(_req:Request,{params}:{params:{colorId:string}}){
    try{
        const {userId}=auth()
   
        if(!userId){
            // console.log(userId,"userId")
        return new NextResponse("unauthorized",{status:401})
        
        }
       
        
        if(!params.colorId){
            // console.log(userId,"userId")
        return new NextResponse("color Id is requied",{status:401})
        
        }
        const color=await prismadb.color.findUnique({
            where:{
                id:params.colorId
            }
        })
            return NextResponse.json(color)
       
    
        
    }catch(error){
        return new NextResponse("internal error",{status:500})

    }
    
}
export async function PATCH(req:Request,{params}:{params:{storeId:string,colorId:string}}){
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
        if(!params.colorId){
            // console.log(userId,"userId")
        return new NextResponse("color Id is requied",{status:401})
        
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
        
        const color=await prismadb.color.updateMany({
            where:{
                id:params.colorId        },data:{
                name,value
            }
        })
        return NextResponse.json(color)

    }catch(error){
        return new NextResponse("internal error",{status:500})

    }
    
    
    
}
export async function DELETE(_req:Request,{params}:{params:{storeId:string,colorId:string}}){
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
        
        if(!params.colorId){
            // console.log(userId,"userId")
        return new NextResponse("category id is requied",{status:401})
        
        }
        const color=await prismadb.color.deleteMany({
            where:{
                id:params.colorId
            }
        })
        return NextResponse.json(color)

    }catch(error){
        return new NextResponse("internal error",{status:500})

    }
  
}