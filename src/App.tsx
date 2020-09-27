import React, { useReducer } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ShoppingButtons from './components/shopping-buttons/ShoppingButtons';
import ShoppingList from './components/shopping-list/ShoppingList';
import { cartReducer, initialState } from './reducers/cart.reducer';

const App = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <div className="sc-container">
      <div className="first-container">
        <ShoppingList state={state} dispatch={dispatch}/>
      </div>
      <div className="second-container">
        <ShoppingButtons state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default App;
