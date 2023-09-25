import { IProduct } from "@/atoms/productCarousel";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { toast } from "react-toastify";

type CartAction =
  | { type: "ADD_ITEM"; payload: IProduct }
  | { type: "COUNT_CHANGE"; payload: { ind: number; count: number } }
  | { type: "RESET" }
  | { type: "LOAD_CART"; payload: IProduct[] };

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
          val._id === action?.payload?._id &&
          val?.variants &&
          action?.payload?.variants &&
          val?.variants[0]?.u === action?.payload?.variants[0]?.u
      );
      if (fountIndex > -1) {
        const raw = [...state];
        raw[fountIndex] = {
          ...raw[fountIndex],
          count: raw[fountIndex]?.count
            ? (raw[fountIndex].count as number) + 1
            : 2,
        };
        return raw;
      }
      return [...state, action.payload];
    case "COUNT_CHANGE":
      const { ind, count } = action?.payload ?? {};
      const raw = [...state];
      if (count === 0) raw.splice(ind, 1);
      else
        raw[ind] = {
          ...raw[ind],
          count: count,
        };
      return raw;
    case "LOAD_CART":
      return [...state, ...action.payload];
    case "RESET":
      return [];
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    if (cartState && Array.isArray(cartState) && cartState.length)
      localStorage.setItem("cart", JSON.stringify(cartState));
  }, [cartState]);

  // Load cart from local storage when the component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    console.log("heloo cart", savedCart);
    if (savedCart) {
      cartDispatch({ type: "RESET" }); // Clear the cart
      const parsedCart = JSON.parse(savedCart);
      console.log("spapr", parsedCart);
      if (parsedCart && Array.isArray(parsedCart))
        cartDispatch({ type: "LOAD_CART", payload: parsedCart as IProduct[] }); // Add items from local storage to the cart
    }
  }, []);

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
