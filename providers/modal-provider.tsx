"use client"
import { StoreModal } from "@/components/modals/store-modal"
import {useEffect,useState} from "react"

export const ModalProvider=()=>{
const[isMounted,SetIsMounted]=useState(false)
useEffect(()=>{
    SetIsMounted(true)
},[])
if(!isMounted){
    return null
}
return (<>
<StoreModal/>
</>)
}