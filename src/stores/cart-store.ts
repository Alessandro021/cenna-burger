import { ProductProps } from "@/utils/data/products"
import { create } from "zustand"
import * as cartInMemory from "./helpers/cart-in-memory"


export type ProductCartProps = ProductProps & {
    quantity: number
}

interface StateProps {
    products: ProductCartProps[]
    add: (product: ProductProps) => void
    remove: (productId: string) => void
}

export const useCartStore = create<StateProps>(set => ({
    products: [],
    add: (product: ProductProps) => set(state => ({
        products: cartInMemory.add(state.products, product)
    })),
    remove: (productId: string) =>  set(state => ({
        products: cartInMemory.remove(state.products, productId)
    }))
}))