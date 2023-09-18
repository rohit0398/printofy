import { CartProvider } from "@/context/cartContext";
import { CategoriesProvider } from "@/context/categoriesContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CategoriesProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </CategoriesProvider>
  );
}
