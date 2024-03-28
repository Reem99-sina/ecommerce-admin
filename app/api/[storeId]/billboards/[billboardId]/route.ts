import {auth} from "@clerk/nextjs"
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
export async function GET(_req:Request,{params}:{params:{billboardId:string}}){
    try{
        
        
        if(!params.billboardId){
            // console.log(userId,"userId")
        return new NextResponse("billboard id is requied",{status:401})
        
        }
       const billboard =await prismadb.billboard.findUnique({
            where:{
                id:params.billboardId
            }
        })
            return NextResponse.json(billboard)
        
    }catch(error){
        console.log(error,"error")
        return new NextResponse("internal error",{status:500})

    }
    
}
export async function PATCH(req:Request,{params}:{params:{storeId:string,billboardId:string}}){
    try{
        const {userId}=auth()
        const body=await req.json()
    
    const {label,imageUrl}= body
        if(!userId){
            // console.log(userId,"userId")
        return new NextResponse("unauthorized",{status:401})
        
        }
        if(!params.storeId){
            // console.log(userId,"userId")
        return new NextResponse("store id is requied",{status:401})
        
        }
        if(!params.billboardId){
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
        
       const billboard= await prismadb.billboard.updateMany({
            where:{
                id:params.billboardId        },data:{
                label,imageUrl
            }
        })
            return NextResponse.json(billboard)
        
    
        
    }catch(error){
        return new NextResponse("internal error",{status:500})

    }
   
}
export async function DELETE(_req:Request,{params}:{params:{storeId:string,billboardId:string}}){
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
        
        if(!params.billboardId){
            // console.log(userId,"userId")
        return new NextResponse("billboard id is requied",{status:401})
        
        }
        const billboard=await prismadb.billboard.deleteMany({
            where:{
                id:params.billboardId
            }
        })
            return NextResponse.json(billboard)
         
    }catch(error){
        return new NextResponse("internal error",{status:500})
    }
    
}