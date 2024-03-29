import { NextResponse } from "next/server";
import {auth} from "@clerk/nextjs"
import prismadb from "@/lib/prismadb";
import {toast} from "react-hot-toast"
export async function POST(req:Request){
   try{
    const {userId}= auth()

    const body=await req.json()
    
    const {name}= body
    // console.log("error",name)
    if(!userId){
        // console.log(userId,"userId")
    return new NextResponse("unauthorized",{status:401})
    
    }
    
    if(!name){
        return new NextResponse("name is required",{status:401})
        
        }
        const store= await prismadb.store.create({
            data:{
                name,userId
            }
        })
            // toast.success("store is created")
    
            return  NextResponse.json(store)
        
   }catch(error){
    return new NextResponse("interal error",{status:500})
   }

    
// }catch(error){
    
//     // toast.error("error")
// return new NextResponse("interal error",{status:500})
// }
}
export async function GET(req:Request){
    try{
                
         const store= await prismadb.store.findMany()
         console.log(store,"store")
             return  NextResponse.json(store)
         
    }catch(error){
     return new NextResponse("interal error",{status:500})
 
    }
     
         
     // }catch(error){
         
     //     // toast.error("error")
     // return new NextResponse("interal error",{status:500})
     // }
     }