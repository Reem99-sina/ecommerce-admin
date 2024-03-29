import { NextResponse } from "next/server";
import {auth} from "@clerk/nextjs"
import prismadb from "@/lib/prismadb";
import {toast} from "react-hot-toast"
export async function POST(req:Request,{params}:{params:{storeId:string}}){
   try{
    const {userId}= auth()

    const body=await req.json()
    
    const {name,value}= body
    
    if(!userId){
        
    return new NextResponse("unauthenticated",{status:401})
    
    }
    
    if(!name){
        return new NextResponse("name is required",{status:401})
        
        }
        if(!value){
            return new NextResponse("value is required",{status:401})
            
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
         const color=await prismadb.color.create({
            data:{
                name,value,storeId:params.storeId
            }
        })
        
        return  NextResponse.json(color)

   }catch(error){
    return new NextResponse("interal error",{status:500})

   }
}
export async function GET(req:Request,{params}:{params:{storeId:string}}){
   try{
    
    
    
            if(!params.storeId){
                return new NextResponse("storeId is required",{status:401})
                
                }
               
         const color= await prismadb.color.findMany({
            where:{
               storeId:params.storeId
            }
        })
        
            // toast.success("store is created")
    
            return  NextResponse.json(color)
        
   }
    catch(error){
        return new NextResponse("interal error",{status:500})

    }
            // toast.error("error some thing was wrong")
    }