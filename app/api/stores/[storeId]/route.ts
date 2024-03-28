import {auth} from "@clerk/nextjs"
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PATCH(req:Request,{params}:{params:{storeId:string}}){
    try{
        const {userId}=auth()
        const body=await req.json()
    
    const {name}= body
        if(!userId){
            // console.log(userId,"userId")
        return new NextResponse("unauthorized",{status:401})
        
        }
        if(!params.storeId){
            // console.log(userId,"userId")
        return new NextResponse("store id is requied",{status:401})
        
        }
       const store= await prismadb.store.updateMany({
            where:{
                id:params.storeId,
                userId
            },data:{
                name
            }
        })
            return NextResponse.json(store)
        
    }catch(error){
        return new NextResponse("internal error",{status:500})

    }
    
}
export async function DELETE(_req:Request,{params}:{params:{storeId:string}}){
    try{
        const {userId}=auth()
   
        if(!userId){
            // console.log(userId,"userId")
        return new NextResponse("unauthorized",{status:401})
        
        }
        if(!params.storeId){
            // console.log(userId,"userId")
        return new NextResponse("store id is requied",{status:401})
        
        }
       const store= await prismadb.store.deleteMany({
            where:{
                id:params.storeId,
                userId
            }
        })
            return NextResponse.json(store)
        
    }catch(error){
        return new NextResponse("internal error",{status:500})

    }
   
}