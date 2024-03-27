"use client"
import * as z from "zod"
import { Heading } from "@/components/ui/heading";
import { Billboard, Category, Size, Store } from "@prisma/client"
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";
import { AlertApi } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface SizeFormProps {
    initialData: Size | null;
}
const formSchema = z.object({
    name: z.string().min(1),
    value: z.string(),
})
type SizeFormValues = z.infer<typeof formSchema>

export const SizeForm: React.FC<SizeFormProps> = ({
    initialData
}) => {
    const title = initialData ? "Edit size" : "create size"
    const description = initialData ? "Edit size" : "Add new size"
    const toastMessage = initialData ? "size updated" : "size created"
    const action = initialData ? "save changes" : "create"


    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const route = useRouter()
    const origin = useOrigin()
    const form = useForm<SizeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            value: ""
        }
    })
    const onSubmit = async (data: SizeFormValues) => {
        setLoading(true)
        if (initialData) {
            await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data).then((store) => {
                // route.refresh()
                route.push(`/${params.storeId}/sizes`)
                route.refresh()
                toast.success(toastMessage)
                setLoading(false)

            }).catch((error) => {
                setLoading(false)

                toast.error("something is wrong")
            })
        } else {
            await axios.post(`/api/${params.storeId}/sizes`, data).then((store) => {
                // route.refresh()
                route.push(`/${params.storeId}/sizes`)
                route.refresh()
                toast.success(toastMessage)
                setLoading(false)

            }).catch((error) => {
                setLoading(false)

                toast.error("something is wrong")
            })
        }

        // console.log(data)
    }
    const onDelete = async () => {
        setLoading(true)
        await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`).then((res) => {
            route.refresh()
            route.push("/")
            toast.success("size deleted")

        }).catch((error) => {

            toast.error("make sure you removed all  products using this size first")
        }).finally(() => {
            setLoading(false)
            setOpen(false)
        })
    }
    return (
        <>
            <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && <Button disabled={loading} variant="destructive" size="icon" onClick={() => setOpen(true)}>
                    <Trash className="h-4 w-4" />
                </Button>}

            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                   
                    <div className="grid grid-cols-3 gap-8">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="size name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)}
                        /> 
                          <FormField control={form.control} name="value" render={({ field }) => (
                            <FormItem>
                                <FormLabel>value</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="size value" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)}
                        /> 
                    </div>
                    <Button disabled={loading} type="submit">{action}</Button>
                </form>
            </Form>
            {/* <Separator /> */}
            {/* <AlertApi title="test" description={`${origin}/api/${params.storeId}`} variant="public"/> */}
        </>
    )
}