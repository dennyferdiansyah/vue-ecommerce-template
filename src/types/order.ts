import type {CartItemTypes} from "@/types/cart.ts";

export interface OrderTypes {
    id: string
    items: CartItemTypes[]
    total: number
    createdAt: string
}