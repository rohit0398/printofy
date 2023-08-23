import { IProduct } from "@/atoms/productCarousel";
import React, { createContext, ReactNode, useContext, useReducer } from "react";

type CartAction =
  | { type: "ADD_ITEM"; payload: IProduct }
  | { type: "REMOVE_ITEM"; payload: number };

type CartState = IProduct[];

const CartContext = createContext<{
  cartState: CartState;
  cartDispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      const fountIndex = state.findIndex(
        (val) =>
          val.id === action?.payload?.id &&
          val?.variant &&
          action?.payload?.variant &&
          val?.variant[0]?.g === action?.payload?.variant[0]?.g
      );
      if (fountIndex > -1) {
        const raw = [...state];
        raw[fountIndex] = {
          ...raw[fountIndex],
          count: raw[fountIndex]?.count
            ? (raw[fountIndex].count as number) + 1
            : 2,
        };
        return raw
      }
      return [...state, action.payload]; // Return updated state
    case "REMOVE_ITEM":
      // Add logic to handle removing an item from the cart
      return state; // Return updated state
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
