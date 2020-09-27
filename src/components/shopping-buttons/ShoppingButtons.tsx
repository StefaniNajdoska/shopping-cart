import React, {useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { InitialState } from '../../models/InitialState';
import { Product } from '../../models/Product';
import './ShoppingButtons.css';

interface Props {
    state: InitialState
    dispatch: any
}

const ShoppingButtons = (props: Props) => {
    useEffect (() =>{
        props.dispatch({ type: 'SET_INPUT_TEXT_AND_PRODUCTS', payload: 'apple, 4, banana, 6.2, strawberry, 2' })
    }, []);

    const handleClick = (product: Product) => {
        props.dispatch({ type: 'ADD_TO_ORDERED_LIST', payload: product })
    }
    return (
        <div className="sb-container">
            <div className="input-container">
                <label>Input text for generate products</label>
                <textarea
                    className="form-control"
                    rows={5}
                    value={props.state.inputText}
                    onChange={(event) => {
                        props.dispatch({ type: 'SET_INPUT_TEXT_AND_PRODUCTS', payload: event?.target?.value })
                    }}
                />
            </div>
            <div className="buttons-container">
                <label>Products</label>
                <br />
                {props.state.products.map((product, i) => {
                    return (
                        <Button key={i} variant="primary" onClick={() => handleClick(product)} >
                            {product.name} ({product.price})
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}
export default ShoppingButtons;