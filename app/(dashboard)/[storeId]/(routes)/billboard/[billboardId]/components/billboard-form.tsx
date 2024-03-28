"use client"
import * as z from "zod"
import { Heading } from "@/components/ui/heading";
import { Billboard, Store } from "@prisma/client"
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
interface billboardFormProps {
    initialData: Billboard | null;
}
const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string(),
})
type billboardFormValues = z.infer<typeof formSchema>

export const BillboardForm: React.FC<billboardFormProps> = ({
    initialData
}) => {
    const title = initialData ? "Edit billboard" : "create billboard"
    const description = initialData ? "Edit billboard" : "Add new billboard"
    const toastMessage = initialData ? "billboard updated" : "billboard created"
    const action = initialData ? "save changes" : "create"


    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const route = useRouter()
    const origin = useOrigin()
    const form = useForm<billboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: "",
            imageUrl: ""
        }
    })
    const onSubmit = async (data: billboardFormValues) => {
        setLoading(true)
        if (initialData) {
            await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data).then((store) => {
                
                route.push(`/${params.storeId}/billboard`)
                route.refresh()
                toast.success(toastMessage)
                setLoading(false)

            }).catch((error) => {
                setLoading(false)

                toast.error("something is wrong")
            })
        } else {
            await axios.post(`/api/${params.storeId}/billboards`, data).then((store) => {
                route.push(`/${params.storeId}/billboard`)
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
        await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`).then((res) => {
            route.refresh()
            route.push("/")
            toast.success("Billboard deleted")

        }).catch((error) => {

            toast.error("make sure you removed all  categories using this billboard first")
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
                    <FormField control={form.control} name="imageUrl" render={({ field }) => (
                        <FormItem>
                            <FormLabel>background image Upload</FormLabel>
                            <FormControl>
                                <ImageUpload value={field.value ? [field.value] : []} disabled={loading}
                                    onChange={(url) => field.onChange(url)}
                                    onRemove={() => field.onChange("")} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField control={form.control} name="label" render={({ field }) => (
                            <FormItem>
                                <FormLabel>label</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="billboard label" {...field} />
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