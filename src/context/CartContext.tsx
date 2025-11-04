import { createContext, useContext, ReactNode, useState } from "react";
import type { Product } from "../types/entities";

interface CartProduct {
  product: Product;
}

interface CartItem {
  product: CartProduct;
  quantity: number;
}

interface CartContextType {
  isOpen: boolean;
  cartItems: CartItem[];
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: CartProduct, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (product: CartProduct, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.product.id === product.product.id
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.product.id === product.product.id
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
      prevItems.filter((item) => item.product.product.id !== productId)
    );
  };
  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.product.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.product.price * item.quantity,
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

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
