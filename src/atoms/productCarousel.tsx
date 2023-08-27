import React, { useState } from "react";
import Slider from "react-slick";
import { positiveDifference } from "@/util/helper";
import { Button } from "./button";
import {
  ShoppingCartIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Modal } from "./modal";

export interface IProduct {
  _id?: number;
  label: string;
  variants?: { g: number; p: number }[];
  count?: number;
  image?: string
}

interface CarouselProps {
  data: IProduct[];
  handelProductSelect: (data: IProduct, cart: boolean) => void;
}

export const ProductCarousel: React.FC<CarouselProps> = ({
  data,
  handelProductSelect,
}) => {
  const slidesToShow = Array.isArray(data) && data.length > 5 ? 5 : data.length;

  const sliderRef = React.useRef<Slider | null>(null);
  const [activeInd, setActiveInd] = useState<number>(0);
  const [showVariants, setShowVariants] = useState(false);
  const [details, setDetails] = useState<{ product: IProduct; cart: boolean }>(
    {} as any
  );

  function handleButtonClick(product: IProduct, cart: boolean) {
    if (Array.isArray(product?.variants) && product?.variants.length > 1) {
      setShowVariants(true);
      setDetails({ product, cart });
    } else handelProductSelect(product, cart);
  }

  function handelVariantClick(variants: any) {
    handelProductSelect(
      {
        ...details?.product,
        variants,
      },
      details?.cart
    );
    setShowVariants(false);
    setDetails({} as any);
  }

  function getScale(ind: number) {
    if (data.length < 3) return "";
    let diff = positiveDifference(activeInd, ind);

    if (diff === data.length - 1) diff = 1;
    else if (diff === data.length - 2) diff = 2;

    if (diff === 1) return `scale-[.85]`;
    else if (diff === 2) return `scale-[.75]`;
    else if (diff === 3) return `scale-[.65]`;
    else return `scale-[.65]`;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
    swipeToSlide: true,
    className: "center",
    centerMode: true,
    centerPadding: "0px",
    arrows: false,
    responsive: [
      {
        breakpoint: 1420,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider
        ref={sliderRef}
        beforeChange={(_ind: number, newInd: number) => {
          setActiveInd(newInd);
        }}
        slidesToShow={slidesToShow}
        {...settings}
      >
        {data.map((product, ind) => {
          return (
            <div
              key={product._id ?? ind}
              className={`flex px-1 md:px-2 py-2 transition duration-500 ${
                ind !== activeInd ? getScale(ind) : ""
              }`}
            >
              <div className={` mx-auto shadow-md rounded-md max-w-sm `}>
                <img
                  src={product?.image}
                  alt={"img"}
                  className="w-full h-full mb-2 rounded-md object-cover"
                />
                <div className="flex flex-col gap-2">
                  <p className="text-white font-semibold md:text-lg text-2xl">
                    {product.label}
                  </p>
                  {product.variants && (
                    <p className="text-white font-bold text-lg mb-2 leading-none">
                      ${product.variants[0]?.p ?? ""}{" "}
                      {product.variants[0]?.g
                        ? ` /${product.variants[0]?.g}g`
                        : ""}
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
          );
        })}
      </Slider>
      <Modal
        open={showVariants}
        setOpen={setShowVariants}
        width="md:max-w-[38rem] w-full"
      >
        <div className=" mb-5 mx-5">
          <div className="flex gap-2 text-base font-semibold text-start mb-10">
            <Square3Stack3DIcon className=" h-6 w-6 text-white" />
            Available variant for {details?.product?.label}
          </div>
          <div className=" flex justify-between items-center">
            <div>
              <img
                src={details?.product?.image}
                alt="img"
                className=" w-16 h-16 object-cover"
              />
            </div>
            <div className="flex md:flex-row flex-col gap-2 flex-wrap text-white">
              {Array.isArray(details?.product?.variants) &&
                details?.product.variants.map((variant, ind) => (
                  <Button
                    onClick={() => handelVariantClick([variant])}
                    title={`$${variant?.p} /${variant?.g}g`}
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
