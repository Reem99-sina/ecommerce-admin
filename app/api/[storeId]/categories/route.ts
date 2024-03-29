import { NextResponse } from "next/server";
import {auth} from "@clerk/nextjs"
import prismadb from "@/lib/prismadb";
import {toast} from "react-hot-toast"
export async function POST(req:Request,{params}:{params:{storeId:string}}){
   try{
    const {userId}= auth()
    const body=await req.json()
    const {name,billboardId}= body
    if(!userId){
    return new NextResponse("unauthenticated",{status:401})
    }
    if(!name){
    return new NextResponse("name is required",{status:401})
    }
    if(!billboardId){
    return new NextResponse("billboardId is required",{status:401})
    }
    if(!params.storeId){
    return new NextResponse("storeId is required",{status:401})
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
       const category=  await prismadb.category.create({
            data:{
                name,billboardId,storeId:params.storeId
            }
        })
            // toast.success("store is created")
            return  NextResponse.json(category)
   }catch(error){
    return new NextResponse("interal error",{status:500})
   }
}
export async function GET(req:Request,{params}:{params:{storeId:string}}){
   try{
            if(!params.storeId){
                return new NextResponse("storeId is required",{status:401})
                
                }
               
        const category= await prismadb.category.findMany({
            where:{
               storeId:params.storeId
            }
        })
        console.log(category,"category")
            return  NextResponse.json(category)
        
   }catch(error){
    return new NextResponse("interal error",{status:500})

   }
    
        
    // }catch(error){
        
    //     // toast.error("error")
    // return new NextResponse("interal error",{status:500})
    // }
    }