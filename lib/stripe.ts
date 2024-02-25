import Stripe from "stripe"

export const stripe=new Stripe(process.env.Secret_key,{
    typescript:true
})