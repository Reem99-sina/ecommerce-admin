import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb";
import { toast } from "react-hot-toast"
export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth()

        const body = await req.json()

        const { name, categoryId, sizeId, colorId, price, images, isFeatured, isArchived } = body

        if (!userId) {

            return new NextResponse("unauthenticated", { status: 401 })

        }

        if (!name) {
            return new NextResponse("name is required", { status: 401 })

        }
        if (!price) {
            return new NextResponse("value is required", { status: 401 })

        }
        if (!categoryId) {
            return new NextResponse("category id is required", { status: 401 })

        }
        if (!sizeId) {
            return new NextResponse("size id is required", { status: 401 })

        }
        if (!colorId) {
            return new NextResponse("color id is required", { status: 401 })

        }
        if (!images ||!images.length) {
            return new NextResponse("images is required", { status: 401 })

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
        const product = await prismadb.product.create({
            data: {
                name, price:String(price), storeId: params.storeId,categoryId,sizeId,colorId,isArchived,isFeatured,
                images:{
                    createMany:{
                        data:[...images.map((image:{url:string})=>image)]
                    }
                }
            }
        })

        return NextResponse.json(product)

    } catch (error) {
        console.log(error,"error")
        return new NextResponse("interal error", { status: 500 })

    }
}
export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const{searchParams}=new URL(req.url);
        const categoryId=searchParams.get("categoryId")||undefined
        const sizeId=searchParams.get("sizeId")||undefined
        const colorId=searchParams.get("colorId")||undefined
        const isFeatured=searchParams.get("isFeatured")

       
        if (!params.storeId) {
            return new NextResponse("storeId is required", { status: 401 })
        }
        const product = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                sizeId,
                colorId,
                isFeatured:isFeatured=="true"?true:isFeatured=="false"?false:true,
                isArchived:false
            },include:{
                images:true,
                category:true,
                color:true,
                size:true
            },orderBy:{
                createdAt:"desc"
            }
        })
        // toast.success("store is created")
     

        return NextResponse.json(product)

    }
    catch (error) {
        console.log(error)
        return new NextResponse("interal error", { status: 500 })

    }
    // toast.error("error some thing was wrong")
}