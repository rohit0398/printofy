import React, { useState } from "react";
import { Button } from "./button";
import {
  ShoppingCartIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Modal } from "./modal";
import { useCart } from "@/context/cartContext";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export interface IProduct {
  _id?: number;
  label: string;
  variants?: { u: string; p: number }[];
  count?: number;
  image?: string;
}

interface CarouselProps {
  product: IProduct;
}

export const Product: React.FC<CarouselProps> = ({
  product
}) => {
  const { push } = useRouter();
  const { cartDispatch } = useCart();

  const [showVariants, setShowVariants] = useState(false);
  const [details, setDetails] = useState<{ product: IProduct; cart: boolean }>(
    {} as any
  );

  function handleButtonClick(product: IProduct, cart: boolean) {
    if (Array.isArray(product?.variants) && product?.variants.length > 1) {
      setShowVariants(true);
      setDetails({ product, cart });
    } else handleProductClick(product, cart);
  }

  function handelVariantClick(variants: any) {
    handleProductClick(
      {
        ...details?.product,
        variants,
      },
      details?.cart
    );
    setShowVariants(false);
    setDetails({} as any);
  }

  function handleProductClick(product: IProduct, cart: boolean) {
    cartDispatch({ type: "ADD_ITEM", payload: product as any });
    if (cart) {
      toast.success("Added to cart.");
      console.log("cart", product);
    } else push("/checkout");
  }

  return (
    <>
      <div
        key={product._id}
        className={`flex px-1 md:px-2 py-2 transition duration-500`}
      >
        <div className={` mx-auto shadow-md rounded-md max-w-sm `}>
          <img
            src={product?.image}
            alt={"img"}
            className="w-full mb-2 rounded-md object-contain"
          />
          <div className="flex flex-col gap-2 text-left">
            <p className="text-white font-semibold md:text-lg text-2xl">
              {product.label}
            </p>
            {product.variants && (
              <p className="text-white font-bold text-lg mb-2 leading-none">
                ${product.variants[0]?.p ?? ""}{" "}
                {product.variants[0]?.u ? ` /${product.variants[0]?.u}` : ""}
              </p>
            )}

            <div className=" flex justify-between gap-4">
              <div className=" grow">
                <Button
                  title="Buy Now"
                  className=" w-full"
                  paddingMargin="px-auto"
                  onClick={() => handleButtonClick(product, false)}
                />
              </div>
              <div
                onClick={() => handleButtonClick(product, true)}
                className=" cursor-pointer flex justify-center items-center px-2 relative"
              >
                <ShoppingCartIcon
                  className="h-8 w-8 text-app-teal"
                  aria-hidden="true"
                />
                <div className=" absolute z-10 top-0 right-0">
                  <PlusCircleIcon className=" h-5 w-5 text-app-teal" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={showVariants}
        setOpen={setShowVariants}
        width="md:max-w-[40rem] w-full"
      >
        <div className=" mb-5 sm:mx-5 mx-0">
          <div className="flex gap-2 text-base font-semibold text-start mb-10">
            <Square3Stack3DIcon className=" h-6 w-6 text-white" />
            Available variant for {details?.product?.label}
          </div>
          <div className=" flex justify-between items-center sm:flex-row flex-col gap-4 sm:gap-2">
            <div>
              <img
                src={details?.product?.image}
                alt="img"
                className=" w-28 h-28 object-cover"
              />
            </div>
            <div className="flex md:flex-row flex-col gap-2 flex-wrap text-white">
              {Array.isArray(details?.product?.variants) &&
                details?.product.variants.map((variant, ind) => (
                  <Button
                    onClick={() => handelVariantClick([variant])}
                    title={`$${variant?.p} /${variant?.u}`}
                    paddingMargin="px-2 lg:px-4"
                    className=" flex items-center gap-2"
                    key={ind}
                  >
                    <PlusCircleIcon className=" h-6 w-6" />
                  </Button>
                ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
