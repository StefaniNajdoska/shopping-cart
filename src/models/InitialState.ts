import { OrderItem } from "./OrderItem";
import { Product } from "./Product";

export interface InitialState {
    inputText: string
    products: Product[]
    orderedList: OrderItem[]

}