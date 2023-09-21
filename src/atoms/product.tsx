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
  image2?: string;
  description?: string;
}

interface CarouselProps {
  product: IProduct;
}

export const Product: React.FC<CarouselProps> = ({ product }) => {
  const { push } = useRouter();
  const { cartDispatch } = useCart();

  const [showVariants, setShowVariants] = useState(false);
  const [buyNow, setBuyNow] = useState(false);
  const [mouseEnter, setMouseEnter] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showFullSize, setFullSize] = useState(false);

  function handleCardClick() {
    console.log("card clicked");
    setShowVariants(true);
  }

  function handleButtonClick(buyNow: boolean) {
    if (Array.isArray(product?.variants) && product?.variants.length > 1) {
      setShowVariants(true);
      setBuyNow(buyNow);
    } else handleProductClick(product, buyNow);
  }

  function handelVariantClick(variants: any) {
    handleProductClick(
      {
        ...product,
        variants,
      },
      buyNow
    );
    setShowVariants(false);
    setBuyNow(false);
  }

  function handleProductClick(product: IProduct, buyNow: boolean) {
    cartDispatch({ type: "ADD_ITEM", payload: product as any });
    if (buyNow) push("/checkout");
    else toast.success("Added to cart.");
  }

  return (
    <>
      <div
        key={product._id}
        className={`flex px-1 md:px-2 py-2 transition duration-500`}
      >
        <div
          onClick={handleCardClick}
          className={` mx-auto shadow-md rounded-md max-w-sm cursor-pointer`}
        >
          <div className=" w-full relative">
            {product?.image2 && (
              <img
                onMouseEnter={() => setMouseEnter((prev) => !prev)}
                src={product?.image2}
                alt={"img"}
                className={`absolute left-0 right-0 z-10 bg-transparent aspect-[1050/1600] mb-2 rounded-md object-cover transition-all duration-500 ${
                  mouseEnter ? "opacity-100 blur-none" : "opacity-0 blur-sm"
                }`}
              />
            )}

            <img
              onMouseEnter={
                product?.image2
                  ? () => setMouseEnter((prev) => !prev)
                  : undefined
              }
              src={product?.image}
              alt={"img"}
              className={`aspect-[1050/1600] mb-2 rounded-md object-cover transition-all duration-500 ${
                mouseEnter ? "opacity-0 blur-sm" : "opacity-100 blur-none"
              }`}
            />
          </div>

          <div className="flex flex-col gap-2 text-left">
            <p className="text-white font-semibold md:text-lg text-2xl">
              {product.label}
            </p>
            {product.variants && (
              <p className="text-white font-bold text-lg mb-2 leading-none">
                {product.variants.length === 1 ? (
                  <span>
                    ${product.variants[0]?.p ?? ""}{" "}
                    {product.variants[0]?.u
                      ? ` /${product.variants[0]?.u}`
                      : ""}
                  </span>
                ) : (
                  <span>
                    ${product.variants[0].p} - $
                    {product.variants[product.variants.length - 1].p}
                  </span>
                )}
              </p>
            )}

            <div className=" flex justify-between gap-4">
              <div className=" grow">
                <Button
                  title="Buy Now"
                  className=" w-full"
                  paddingMargin="px-auto"
                  onClick={(e: any) => {
                    e?.stopPropagation();
                    handleButtonClick(true);
                  }}
                />
              </div>
              <div
                onClick={(e: any) => {
                  e?.stopPropagation();
                  handleButtonClick(false);
                }}
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
        width="md:max-w-[50rem] w-full"
      >
        <div className=" mb-5 sm:mx-5 mx-0">
          <div className="flex gap-2 text-base font-semibold text-start mb-10">
            <Square3Stack3DIcon className=" h-6 w-6 text-white" />
            Details for {product?.label}
          </div>
          <div className=" flex sm:flex-row flex-col gap-4 sm:gap-8">
            <div className=" shrink-0">
              <img
                onClick={()=> setFullSize(true)}
                src={selectedIndex === 1 ? product?.image2 : product?.image}
                alt="img"
                className=" max-w-[16rem] aspect-[1050/1600] object-cover cursor-pointer"
              />
              {product?.image2 && (
                <div className=" flex gap-4 mt-6">
                  <img
                    onClick={() => setSelectedIndex(0)}
                    src={product?.image}
                    alt="img"
                    className={`cursor-pointer max-w-[4rem] aspect-[1050/1600] object-cover ${
                      selectedIndex === 0
                        ? "border-4 border-app-purple rounded"
                        : ""
                    } `}
                  />
                  <img
                    onClick={() => setSelectedIndex(1)}
                    src={product?.image2}
                    alt="img"
                    className={`cursor-pointer max-w-[4rem] aspect-[1050/1600] object-cover ${
                      selectedIndex === 1
                        ? "border-4 border-app-purple rounded"
                        : ""
                    } `}
                  />
                </div>
              )}
            </div>
            <div className=" text-left flex flex-col gap-4">
              <div className="text-white font-semibold text-lg md:text-2xl">
                {product?.label}
              </div>
              <div className=" text-white font-normal text-base md:text-lg whitespace-pre-line">
                {product?.description}
              </div>
              <div className="flex md:flex-row flex-col gap-2 flex-wrap text-white">
                {Array.isArray(product?.variants) &&
                  product.variants.map((variant, ind) => (
                    <Button
                      onClick={() => handelVariantClick([variant])}
                      title={`$${variant?.p} /${variant?.u}`}
                      paddingMargin="px-2 lg:px-4"
                      className=" flex items-center gap-2 justify-center sm:justify-start"
                      key={ind}
                    >
                      <PlusCircleIcon className=" h-6 w-6" />
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <Modal
          open={showFullSize}
          setOpen={setFullSize}
          width="w-screen h-screen"
        >
          <img
            src={selectedIndex === 1 ? product?.image2 : product?.image}
            className="w-full h-full object-contain"
          />
        </Modal>
      </Modal>
    </>
  );
};
