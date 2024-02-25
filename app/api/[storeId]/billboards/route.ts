import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb";
import { toast } from "react-hot-toast"
export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { label, imageUrl } = body
        if (!userId) {
            // console.log(userId,"userId")
            return new NextResponse("unauthenticated", { status: 401 })
        }
        if (!label) {
            return new NextResponse("label is required", { status: 401 })
        }
        if (!imageUrl) {
            return new NextResponse("imageUrl is required", { status: 401 })
        }
        if (!params.storeId) {
            return new NextResponse("storeId is required", { status: 401 })
        }
        const store = await prismadb.store.findFirst({
            where: {
                id: params?.storeId,
                userId
            }
        })
        if (!store) {
            return new NextResponse("unauthorized", { status: 403 })
        }
        const billboard = await prismadb.billboard.create({
            data: {
                label, imageUrl, storeId: params.storeId
            }
        })
        // toast.success("store is created")
        return NextResponse.json(billboard)
    } catch (error) {
        return new NextResponse("interal error", { status: 500 })

    }

    // }catch(error){

    //     // toast.error("error")
    // return new NextResponse("interal error",{status:500})
    // }
}
export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {
       
        if (!params.storeId) {
            return new NextResponse("storeId is required", { status: 401 })
        }
        const result = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId
            }
        })
        // toast.success("store is created")
        return NextResponse.json(result)
        // }catch(error){
        //     // toast.error("error")
        // return new NextResponse("interal error",{status:500})
        // }
    } catch (error) {
        return new NextResponse("interal error", { status: 500 })
    }
}