"use client"

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { AlertApi } from "./api-alert";

interface ApiListProps{
    entityName:string;
    entityIdName:string;
}
export const ApiList:React.FC<ApiListProps>=({
    entityName,entityIdName
})=>{
    const params=useParams()
    const origin=useOrigin()
    const baseUrl=`${origin}/api/${params.storeId}`
    return(<>
        <AlertApi title="GET"variant="public"description={`${baseUrl}/${entityName}`}/>
        <AlertApi title="GET"variant="public"description={`${baseUrl}/${entityName}/{${entityIdName}}`}/>
        <AlertApi title="POST"variant="admin"description={`${baseUrl}/${entityName}`}/>
        <AlertApi title="PATCH"variant="admin"description={`${baseUrl}/${entityName}/{${entityIdName}}`}/>
        <AlertApi title="DELETE"variant="admin"description={`${baseUrl}/${entityName}/{${entityIdName}}`}/>

        </>
    )
}