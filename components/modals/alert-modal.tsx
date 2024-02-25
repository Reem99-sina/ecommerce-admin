"use client"
import {useEffect, useState}from "react"
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
interface AlertModalProps{
    isOpen:boolean;
    onClose:()=>void;
    onConfirm:()=>void;
    loading:boolean;
}
export const AlertModal:React.FC<AlertModalProps>=({isOpen,onClose,onConfirm,loading})=>{
    const [isMounting,serIsMounting]=useState(false)
    useEffect(()=>{
        serIsMounting(true)
    },[])
    if(!isMounting){
        return null
    }
    return (
        <Modal title="Are you sure?"description="this action cannot be update" isOpen={isOpen}
        onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={onClose}>cancel</Button>
                <Button disabled={loading} variant="destructive" onClick={onConfirm}>continue</Button>

            </div>
        </Modal>
    )
}