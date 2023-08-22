import React, { useState } from "react";
import Slider from "react-slick";
import { positiveDifference } from "@/util/helper";
import { Button } from "./button";

export interface Product {
  id?: number;
  label: string;
  variant?: { g: number; p: number }[];
}

interface CarouselProps {
  data: Product[];
}

export const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const sliderRef = React.useRef<Slider | null>(null);
  const [activeInd, setActiveInd] = useState<number>(0);
  const slidesToShow = Array.isArray(data) && data.length > 3 ? 3 : data.length;
  function getScale(ind: number) {
    if (data.length < 3) return "";
    let diff = positiveDifference(activeInd, ind);

    if (diff === data.length - 1) diff = 1;
    else if (diff === data.length - 2) diff = 2;
    // else if (diff > 3) diff = 3;

    if (diff === 1) return `scale-[.85]`;
    else if (diff === 2) return `scale-[.75]`;
    else if (diff === 3) return `scale-[.65]`;
    else return `scale-[.65]`;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
    swipeToSlide: true,
    className: "center",
    centerMode: true,
    centerPadding: "70px",
    responsive: [
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
    <Slider
      ref={sliderRef}
      beforeChange={(_ind: number, newInd: number) => {
        setActiveInd(newInd);
        console.log("index", newInd);
      }}
      slidesToShow={slidesToShow}
      {...settings}
    >
      {data.map((product, ind) => {
        return (
          <div
            key={product.id}
            className={` px-2 transition duration-500 ${
              ind !== activeInd ? getScale(ind) : ""
            }`}
          >
            <div
              className={` border border-white/30 p-4 shadow-md rounded-md max-w-sm`}
            >
              <img
                src={"assests/product.png"}
                alt={"img"}
                className="w-full h-full mb-2 rounded-md object-cover"
              />
              <div className=" px-4 flex flex-col gap-2">
                <p className="text-white font-semibold text-base">
                  {product.label}
                </p>
                {product.variant && (
                  <p className="text-white font-bold text-lg">
                    ${product.variant[0]?.p ?? ""}{" "}
                    {product.variant[0]?.g ? ` /${product.variant[0]?.g}g` : ""}
                  </p>
                )}

                <div className=" flex justify-between gap-4">
                  <div className=" grow">
                    <Button
                      title="Buy Now"
                      className=" w-full"
                      paddingMargin="px-auto"
                    />
                  </div>
                  <Button
                    variant="out-lined"
                    title="Cart"
                    paddingMargin="px-2 xl:px-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};
