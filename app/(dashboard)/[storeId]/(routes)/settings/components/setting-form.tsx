"use client"
import * as z from "zod"
import { Heading } from "@/components/ui/heading";
import { Store } from "@prisma/client"
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { useState } from "react";
import { Form, FormField, FormItem, FormLabel,FormControl, FormMessage } from "@/components/ui/form";
import {Input} from "@/components/ui/input"
import {useParams,useRouter} from "next/navigation"
import toast from "react-hot-toast";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";
import { AlertApi } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
interface SettingsFormProps{
    initialData:Store;
}
const formSchema=z.object({
    name:z.string().min(1)
})
type SettingsFormValues =z.infer<typeof formSchema>
export const SettingsForm:React.FC<SettingsFormProps>=({
    initialData
})=>{
    const[open,setOpen]=useState(false)
    const[loading,setLoading]=useState(false)
    const params=useParams()
    const route=useRouter()
    const origin=useOrigin()
    const form=useForm<SettingsFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData
    })
    const onSubmit=async(data:SettingsFormValues)=>{
        setLoading(true)
        await axios.patch(`/api/stores/${params.storeId}`,data).then((store)=>{
            route.refresh()
            toast.success("store updated")
            setLoading(false)

        }).catch((error)=>{
            setLoading(false)

            toast.error("something is wrong")
        })
        console.log(data)
    }
    const onDelete=async()=>{
        setLoading(true)
        await axios.delete(`/api/stores/${params.storeId}`).then((res)=>{
            route.refresh()
            route.push("/")
            toast.success("store deleted")

        }).catch((error)=>{

            toast.error("make sure you removed all products and categories first")
        }).finally(()=>{
            setLoading(false)
            setOpen(false)
        })
    }
    return (
        <>
        <AlertModal isOpen={open} onClose={()=>setOpen(false)}onConfirm={onDelete}loading={loading}/>
        <div className="flex items-center justify-between">
            <Heading title={"settings"}description={"why"}/>
            <Button disabled={loading} variant="destructive"size="icon"onClick={()=>setOpen(true)}>
            <Trash className="h-4 w-4"/>
        </Button>
        </div>
        <Separator />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <div className="grid grid-cols-3 gap-8">
                    <FormField control={form.control} name="name" render={({field})=>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="store name" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>)}
                    />
                </div>
                <Button disabled={loading} type="submit">save changes</Button>
            </form>
        </Form>
        <Separator/>
        <AlertApi title="test" description={`${origin}/api/${params.storeId}`} variant="public"/>
        </>
    )
}