import api from "@/util/api";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { toast } from "react-toastify";

export type ICategories = {
  label: string;
  image: string;
  _id: string;
};

type CartAction =
  | { type: "LOAD_CATEGORIES"; payload: ICategories[] }
  | { type: "RESET" };

type CategoriesState = ICategories[];

const CartContext = createContext<{
  categories: CategoriesState;
  categoriesDispatch: React.Dispatch<CartAction>;
} | null>(null);

const categoriesReducer = (state: CategoriesState, action: CartAction): CategoriesState => {
  switch (action.type) {
    case "LOAD_CATEGORIES":
      return action.payload;
    case "RESET":
      return [];
    default:
      return state;
  }
};

export const CategoriesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [categories, categoriesDispatch] = useReducer(categoriesReducer, []);

  useEffect(() => {
    api
      .get(`/category?status=true`)
      .then((res) => {
        categoriesDispatch({ type: "LOAD_CATEGORIES", payload: res?.data }); // Clear the cart
      })
      .catch(() =>
        toast.error("Unable to load categories, Please refresh page!")
      );
  }, []);

  return (
    <CartContext.Provider value={{ categories, categoriesDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
};
