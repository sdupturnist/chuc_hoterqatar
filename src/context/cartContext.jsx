// themes/themeContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  


  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cartItems")))   
}, []);



  return (
    <CartContext.Provider value={{ cart, setCart, cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
