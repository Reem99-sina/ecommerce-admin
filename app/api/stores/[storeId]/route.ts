import {auth} from "@clerk/nextjs"
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PATCH(req:Request,{params}:{params:{storeId:string}}){
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
    await prismadb.store.updateMany({
        where:{
            id:params.storeId,
            userId
        },data:{
            name
        }
    }).then((store)=>{
        return NextResponse.json(store)
    }).catch((error)=>{
        return new NextResponse("internal error",{status:500})

    })
}
export async function DELETE(_req:Request,{params}:{params:{storeId:string}}){
    const {userId}=auth()
   
    if(!userId){
        // console.log(userId,"userId")
    return new NextResponse("unauthorized",{status:401})
    
    }
    if(!params.storeId){
        // console.log(userId,"userId")
    return new NextResponse("store id is requied",{status:401})
    
    }
    await prismadb.store.deleteMany({
        where:{
            id:params.storeId,
            userId
        }
    }).then((store)=>{
        return NextResponse.json(store)
    }).catch((error)=>{
        return new NextResponse("internal error",{status:500})

    })
}