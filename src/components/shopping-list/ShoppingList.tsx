import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { InitialState } from '../../models/InitialState';
import { OrderItem } from '../../models/OrderItem';
import './ShoppingList.css';

interface Props {
    state: InitialState,
    dispatch: any;
}

const ShoppingList = (props: Props) => {
    const removeItem = (orderItem: OrderItem) => {
        props.dispatch({ type: 'DELETE_ITEM_FROM_ORDERED_LIST', payload: orderItem })
    }
    const calculateTotal = () => {
        let total = 0;
        for (let i = 0; i < props.state.orderedList.length; i++) {
            total += props.state.orderedList[i].price * props.state.orderedList[i].quantity;
        }
        return total;
    }
    return (
        <div className="sl-container">
            <div className="list-container">
                <label>Order list</label>
                <ListGroup>
                    {props.state.orderedList.map((orderItem, i) => {
                        return (
                            <ListGroup.Item key={i}>
                                {orderItem.name} {orderItem.quantity} x {orderItem.price} = {orderItem.quantity * orderItem.price}
                                <Button className='remove-button' variant="danger" onClick={() => { removeItem(orderItem) }}>
                                    Remove
                            </Button>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>

            </div>
            <div className="total-container">
                <span>Total: {calculateTotal()} </span>
                <br />
                <span>Items: {props.state.orderedList.length}</span>
            </div>
        </div>
    )
}
export default ShoppingList;
