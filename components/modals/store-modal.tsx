"use client"
import * as z from "zod"
import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {Button} from "@/components/ui/button"
import { Input } from "../ui/input"
import { useState } from "react"
import axios from 'axios';
import toast from "react-hot-toast"
const formStore = z.object({
    name: z.string()
})
export const StoreModal = () => {
    const StoreModal = useStoreModal()
    const [loading,setLoading]=useState(false)
    const form = useForm<z.infer<typeof formStore>>({
        resolver: zodResolver(formStore),
        defaultValues: {
            name: ""
        }
    })
    const onSubmit = async (values: z.infer<typeof formStore>) => {

        
            setLoading(true) 
        
            await axios.post("/api/stores",values).then((res)=>{
                window.location.assign(`/${res.data.id}`)
            setLoading(false) 

            }).catch((error)=>{
                toast.error("error in create store")
                setLoading(false) 

            })

           
        
    }
    return (
        <Modal
            title="create store"
            description="add a new store to manage products and categories"
            isOpen={StoreModal.isOpen}
            onClose={StoreModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name="name"render={({field})=>(
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder={"E-commerce"} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button variant="outline"disabled={loading} onClick={StoreModal.onClose}>cancel</Button>
                                <Button type="submit"disabled={loading} >contine</Button>

                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}