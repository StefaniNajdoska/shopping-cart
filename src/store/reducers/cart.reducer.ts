import { idText } from "typescript";
import { InitialState } from "../../models/InitialState";
import { OrderItem } from "../../models/OrderItem";
import { Product } from "../../models/Product";

export const initialState: InitialState = {
    inputText: '',
    products: [],
    orderedList: []

}

const generateProducts = (inputText: string): Product[] => {
    let inputArray = inputText.split(',');
    let products: Product[] = [];
    let totalLength = inputArray.length % 2 === 0 ? inputArray.length : inputArray.length - 1
    for (let i = 0; i < totalLength; i++) {
        if (!isNaN(parseFloat(inputArray[i + 1]))) {
            let product: Product = {
                name: inputArray[i].trim(),
                price: parseFloat(inputArray[i + 1])
            }
            if (products.findIndex((p) => { return JSON.stringify(product) === JSON.stringify(p) }) === -1) {
                products.push(product);
                i += 1
            }
        }
    }
    return products;
}

const addToOrderedList = (orderedList: OrderItem[], product: Product) => {
    let flag = true;
    for (let i = 0; i < orderedList.length; i++) {
        if (orderedList[i].name === product.name && orderedList[i].price === product.price) {
            orderedList = [
                ...orderedList.slice(0, i),
                {
                    ...orderedList[i],
                    quantity: orderedList[i].quantity + 1,
                },
                ...orderedList.slice(i + 1)
            ]
            flag = false;
        }
    }
    if (flag === true) {
        const orderItem: OrderItem = {
            name: product.name,
            quantity: 1,
            price: product.price
        }

        orderedList = [
            ...orderedList,
            orderItem
        ]
    }

    return orderedList;
}

const deleteItemFromOrderedList = (orderedList: OrderItem[], orderItem: OrderItem) =>{
        if(orderItem.quantity > 1){
            for (let i = 0; i < orderedList.length; i++) {
                if(orderedList[i].name === orderItem.name && orderedList[i].price === orderItem.price){
                    orderedList = [
                        ...orderedList.slice(0, i),
                        {
                            ...orderedList[i],
                            quantity: orderedList[i].quantity -1,
                        },
                         ...orderedList.slice(i+1)
                    ]
                }
            }
        }
        else{
            const newList = orderedList.filter((item) => JSON.stringify(orderItem) !== JSON.stringify(item));
            orderedList = [...newList]
        }
    return orderedList;
}

export const cartReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_INPUT_TEXT_AND_PRODUCTS':
            return {
                ...state,
                inputText: action.payload,
                products: generateProducts(action.payload)
            }
        case 'ADD_TO_ORDERED_LIST':
            return {
                ...state,
                orderedList: addToOrderedList(state.orderedList, action.payload)
            }
        case 'DELETE_ITEM_FROM_ORDERED_LIST':
            return{
                ...state,
                orderedList: deleteItemFromOrderedList(state.orderedList, action.payload)
            }
        default:
            return state;
    }
}