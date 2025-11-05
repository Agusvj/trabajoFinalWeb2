/* eslint-disable react-refresh/only-export-components */

import { createContext, ReactNode, useState } from "react";
import type { Product } from "../types/entities";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  isOpen: boolean;
  cartItems: CartItem[];
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getCartTotal: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      console.log(product);
      console.log(cartItems);

      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        isOpen,
        cartItems,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
