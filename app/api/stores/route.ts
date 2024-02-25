import { NextResponse } from "next/server";
import {auth} from "@clerk/nextjs"
import prismadb from "@/lib/prismadb";
import {toast} from "react-hot-toast"
export async function POST(req:Request){
   
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
     await prismadb.store.create({
        data:{
            name,userId
        }
    }).then((store)=>{
        // toast.success("store is created")

        return  NextResponse.json(store)
    }).catch((error)=>{
        // toast.error("error some thing was wrong")

        return new NextResponse("interal error",{status:500})
    })
    
// }catch(error){
    
//     // toast.error("error")
// return new NextResponse("interal error",{status:500})
// }
}