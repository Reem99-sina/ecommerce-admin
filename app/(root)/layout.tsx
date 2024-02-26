import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import {redirect} from "next/navigation"

export default async function SetupLayout({children}:{children:React.ReactNode}){
    const {userId}=auth()
    if(!userId){
        redirect(process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL)
    }
    const store=await prismadb.store.findFirst({
        where:{
            userId
        }
    })
    if(store){
        redirect(`/${store.id}`)
    }
    return(<>
    {children}
    </>)
}