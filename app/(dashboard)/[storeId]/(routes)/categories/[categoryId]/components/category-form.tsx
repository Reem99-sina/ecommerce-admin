"use client"
import * as z from "zod"
import { Heading } from "@/components/ui/heading";
import { Billboard, Category, Store } from "@prisma/client"
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
interface CategoryFormProps {
    initialData: Category | null;
    billboards:Billboard[]
}
const formSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string(),
})
type CategoryFormValues = z.infer<typeof formSchema>

export const CategoryForm: React.FC<CategoryFormProps> = ({
    initialData,billboards
}) => {
    const title = initialData ? "Edit category" : "create category"
    const description = initialData ? "Edit category" : "Add new category"
    const toastMessage = initialData ? "category updated" : "category created"
    const action = initialData ? "save changes" : "create"


    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const route = useRouter()
    const origin = useOrigin()
    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            billboardId: ""
        }
    })
    const onSubmit = async (data: CategoryFormValues) => {
        setLoading(true)
        if (initialData) {
            await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data).then((store) => {
                route.push(`/${params.storeId}/categories`)
                route.refresh()
                toast.success(toastMessage)
                setLoading(false)

            }).catch((error) => {
                setLoading(false)

                toast.error("something is wrong")
            })
        } else {
            await axios.post(`/api/${params.storeId}/categories`, data).then((store) => {
                route.push(`/${params.storeId}/categories`)
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
        await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`).then((res) => {
            route.refresh()
            route.push("/")
            toast.success("category deleted")

        }).catch((error) => {

            toast.error("make sure you removed all  products using this category first")
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
                                    <Input disabled={loading} placeholder="category name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)}
                        /> <FormField control={form.control} name="billboardId" render={({ field }) => (
                            <FormItem>
                                <FormLabel>billboard</FormLabel>
                                <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value} placeholder={"Select a billboard"}/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {billboards.map((billboard)=>(
                                            <SelectItem key={billboard.id} value={billboard.id}>{billboard.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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