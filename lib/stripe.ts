import Stripe from "stripe"

export const stripe=new Stripe(process.env.SECERT_KEY!,{
    typescript:true
})