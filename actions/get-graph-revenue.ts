import prismadb from "@/lib/prismadb"
interface GraphProps{
    name:string;
    total:number
}
export const getGraph=async(storeId:string)=>{
    const salesCount=await prismadb.order.findMany({
        where:{
            storeId,
            isPaid:true
        },include:{
            orderItems:{
                include:{
                    product:true
                }
            }
        }
    })
    let monthyRevnue:{[key:number]:number}={}
    for(const order of salesCount){
        let month=order.createdAt.getMonth()
        let revenueForOrder=0
        for(const items of order.orderItems){
            revenueForOrder+=Number(items.product.price)
        }
        monthyRevnue[month]=(monthyRevnue[month]||0)+revenueForOrder
    }
    const graphs:GraphProps[]=[
        {name:"Jan",total:0},
        {name:"Feb",total:0},
        {name:"Mar",total:0},
        {name:"Apr",total:0},
        {name:"May",total:0},
        {name:"Jun",total:0},
        {name:"Jul",total:0},
        {name:"Aust",total:0},
        {name:"Sep",total:0},
        {name:"Oct",total:0},
        {name:"Nov",total:0},
        {name:"Dec",total:0},

    ]
    for(const month in monthyRevnue){
        graphs[parseInt(month)].total=monthyRevnue[parseInt(month)]
    }
   return graphs
}