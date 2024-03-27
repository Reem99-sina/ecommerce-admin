"use client"
import * as z from "zod"
import { Heading } from "@/components/ui/heading";
import { Billboard, Category, Color, Image, Product, Size, Store } from "@prisma/client"
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";
import { AlertApi } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
interface ProductFormProps {
    initialData: Product & {
        images: Image[]
    } | null;
    categories: Category[];
    sizes: Size[];
    colors: Color[]
}
const formSchema = z.object({
    name: z.string().min(1),
    images: z.object({ url: z.string() }).array(),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    sizeId: z.string().min(1),
    colorId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional()
})
type ProductFormValues = z.infer<typeof formSchema>

export const ProductForm: React.FC<ProductFormProps> = ({
    initialData, categories, sizes, colors
}) => {
    const title = initialData ? "Edit product" : "create product"
    const description = initialData ? "Edit product" : "Add new product"
    const toastMessage = initialData ? "product updated" : "product created"
    const action = initialData ? "save changes" : "create"
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const route = useRouter()
    const origin = useOrigin()
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? { ...initialData, price: parseFloat(String(initialData.price)) } : {
            name: "",
            sizeId: "",
            colorId: "",
            categoryId: "",
            images: [],
            price: 0,
            isFeatured: false,
            isArchived: false
        }
    })
    const onSubmit = async (data: ProductFormValues) => {
        setLoading(true)
        if (initialData) {
            await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data).then((store) => {
                
                route.push(`/${params.storeId}/products`)
                route.refresh()
                toast.success(toastMessage)
                setLoading(false)

            }).catch((error) => {
                setLoading(false)

                toast.error("something is wrong")
            })
        } else {
            await axios.post(`/api/${params.storeId}/products`, data).then((store) => {
                route.push(`/${params.storeId}/products`)
                route.refresh()
                toast.success(toastMessage)
                setLoading(false)

            }).catch((error) => {
                setLoading(false)
                console.log(error,"error")
                toast.error("something is wrong")
            })
        }

        // console.log(data)
    }
    const onDelete = async () => {
        setLoading(true)
        await axios.delete(`/api/${params.storeId}/products/${params.productId}`).then((res) => {
            route.refresh()
          
            toast.success("product deleted")

        }).catch((error) => {

            toast.error("something is wrong")
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
                    <FormField control={form.control} name="images" render={({ field }) => (
                        <FormItem>
                            <FormLabel>images</FormLabel>
                            <FormControl>
                                <ImageUpload value={field.value.map((ele) => ele.url)}
                                    onChange={(url) => field.onChange([...field.value, { url }])}
                                    onRemove={(url) => field.onChange([...field.value.filter((ele) => ele.url !== url)])} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>)}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="product name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)}
                        />
                        <FormField control={form.control} name="price" render={({ field }) => (
                            <FormItem>
                                <FormLabel>price</FormLabel>
                                <FormControl>
                                    <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)}
                        />
                        <FormField control={form.control} name="categoryId" render={({ field }) => (
                            <FormItem>
                                <FormLabel>category</FormLabel>
                                <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value} placeholder={"Select a category "} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        {/* <FormField control={form.control} name="price" render={({ field }) => (
                            <FormItem>
                                <FormLabel>price</FormLabel>
                                <FormControl>
                                    <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        /> */}
                        <FormField control={form.control} name="sizeId" render={({ field }) => (
                            <FormItem>
                                <FormLabel>size</FormLabel>
                                <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value} placeholder={"Select a size"} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {sizes.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField control={form.control} name="colorId" render={({ field }) => (
                            <FormItem>
                                <FormLabel>color</FormLabel>
                                <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value} placeholder={"Select a color"} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {colors.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField control={form.control} name="isFeatured" render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormLabel>is Featured</FormLabel>
                                <FormControl>
                                    
                                    <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                   
                                    
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                        <FormLabel>Featured</FormLabel>
                                        <FormDescription>
                                            this product will appear on the home page
                                        </FormDescription>
                                    </div>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField control={form.control} name="isArchived" render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormLabel>is Archived</FormLabel>
                                <FormControl>
                                    
                                    <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                   
                                   

                                </FormControl>
                                <div className="space-y-1 leading-none">
                                        <FormLabel>Archived</FormLabel>
                                        <FormDescription>
                                            this product will not appear anywhere in the store
                                        </FormDescription>
                                    </div>
                                <FormMessage />
                            </FormItem>
                            )}
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