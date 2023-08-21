import Image from "next/image";
import { Inter } from "next/font/google";
import { Layout } from "@/layouts";
import { InputField } from "@/atoms/input";
import { Button } from "@/atoms/button";
import { Carousel } from "@/atoms/carousel";
import { useState } from "react";

export type ICategories = "mushroom" | "edible" | "microdose" | "merch";
const inter = Inter({ subsets: ["latin"] });

const Categories = [
  { label: "Magic Mushroom", value: "mushroom" },
  { label: "Edible", value: "edible" },
  { label: "Microdose", value: "microdose" },
  { label: "Merch", value: "merch" },
];
const DiffDatas = {
  mushroom: [
    {
      label: "Albino Zilla",
      value: "albinoZilla",
      variant: [
        { g: 7, p: 60 },
        { g: 14, p: 100 },
        { g: 28, p: 190 },
      ],
    },
    {
      label: "Gold Members",
      value: "goldMembers",
      variant: [
        { g: 7, p: 60 },
        { g: 14, p: 100 },
        { g: 28, p: 190 },
      ],
    },
    {
      label: "Gold Teachers",
      value: "goldTeachers",
      variant: [
        { g: 7, p: 60 },
        { g: 14, p: 100 },
        { g: 28, p: 190 },
      ],
    },
    {
      label: "Penis Envy",
      value: "penisEnvy",
      variant: [
        { g: 7, p: 60 },
        { g: 14, p: 100 },
        { g: 28, p: 190 },
      ],
    },
    {
      label: "Trinity",
      value: "trinity",
      variant: [
        { g: 7, p: 60 },
        { g: 14, p: 100 },
        { g: 28, p: 190 },
      ],
    },
    {
      label: "Albino Teachers",
      value: "albinoTeachers",
      variant: [
        { g: 7, p: 70 },
        { g: 14, p: 120 },
        { g: 28, p: 230 },
      ],
    },
    {
      label: "Mckilla Gorilla",
      value: "mckillaGorilla",
      variant: [
        { g: 7, p: 70 },
        { g: 14, p: 120 },
        { g: 28, p: 230 },
      ],
    },
    {
      label: "Tidal Wave",
      value: "tidalWave",
      variant: [
        { g: 7, p: 70 },
        { g: 14, p: 120 },
        { g: 28, p: 230 },
      ],
    },
  ],

  edible: [
    {
      label: "Dark Chocolate Bar",
      value: "darkChocolate",
      variant: [{ g: 4, p: 50 }],
    },
    {
      label: "Dark Chocolate Bar",
      value: "darkChocolate",
      variant: [{ g: 4, p: 50 }],
    },
    {
      label: "Milk Chocolate Bar",
      value: "milkChocolate",
      variant: [{ g: 4, p: 50 }],
    },
    {
      label: "Peach Gummies",
      value: "peachGummies",
      variant: [{ g: 3, p: 45 }],
    },
    {
      label: "Blueberry Gummies",
      value: "blueGummies",
      variant: [{ g: 3, p: 45 }],
    },
    {
      label: "Chocolate Gummies",
      value: "chocolateGummies",
      variant: [{ g: 3, p: 45 }],
    },
  ],

  microdose: [
    { label: "Focus capsules", value: "focusCapsules", variant: [{ p: 25 }] },
    {
      label: "Anxiety capsule",
      value: "anxietyCapsules",
      variant: [{ p: 25 }],
    },
  ],
  merch: [
    { label: "Hoodie", value: "hoodie", variant: [{ p: 120 }] },
    { label: "Short", value: "short", variant: [{ p: 95 }] },

    { label: "Tee", value: "tee", variant: [{ p: 55 }] },

    { label: "Cap", value: "cap", variant: [{ p: 45 }] },

    { label: "Bucket", value: "bucket", variant: [{ p: 35 }] },
    { label: "Tote", value: "tote", variant: [{ p: 25 }] },
  ],
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] =
    useState<ICategories>("mushroom");
  function scrollScreen() {
    // Scroll smoothly to the new position
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: "smooth",
    });
  }
  return (
    <Layout>
      <div className="">
        <div className=" w-full h-[calc(100vh-4rem)] relative overflow-hidden">
          <video
            autoPlay
            muted
            loop
            className="absolute top-0 left-0 md:left-[20%] -z-20 w-full h-[calc(100vh-4rem)] object-cover"
          >
            <source src="/assests/shroom-video4.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className=" flex justify-center items-center circular-gradient top-0 left-0 right-0 md:left-[20%] md:right-[-20%] absolute -z-10 h-[calc(100vh-4rem)]">
            <img
              src="assests/shroom-logo.png"
              className=" max-w-[14rem] w-fit object-cover transition duration-500"
            />
          </div>

          <div className=" flex flex-col gap-5 justify-start text-center pb-6 md:text-left md:justify-center md:pb-0 w-full h-full relative">
            <div className=" px-2 md:px-10 mt-[15%] md:mt-0">
              <div className=" hidden md:inline-block">
                <img
                  src="assests/shroom-logo-small.png"
                  className="max-w-[5rem] w-fit object-cover "
                />
              </div>
              <div className=" text-7xl text-app-purple font-semibold custom-white-text-shadow">
                SHROOM CITY
              </div>
              <div className=" text-3xl text-white font-bold custom-purple-text-shadow">
                Where The Magic Happens
              </div>
            </div>
            <div className=" flex flex-col justify-center items-center bottom-[10%] left-0 right-0 md:left-[20%] md:right-[-20%] absolute">
              <Button
                onClick={scrollScreen}
                title="Explore More"
                className=""
              />
            </div>
          </div>
        </div>

        <div className=" flex flex-col mt-20">
          <div className="flex gap-4 flex-wrap mx-auto justify-center">
            {Categories.map((val,key) => (
              <div key={key}
                onClick={() => setSelectedCategory(val.value as ICategories)}
                className={`${
                  selectedCategory === val.value
                    ? "bg-app-purple text-white"
                    : "bg-white text-black"
                } cursor-pointer w-64  p-4 flex gap-4 items-center justify-center rounded-md hover:ring ring-app-purple transition duration-500`}
              >
                <div>
                  <img
                    src="assests/store.png"
                    className=" w-8 h-8 object-cover"
                  />
                </div>
                <div className=" text-xl font-bold">{val?.label}</div>
              </div>
            ))}
          </div>

          <div className="container mx-auto p-6">
            <div className=" my-10">
              <h1 className="text-2xl mb-4 text-center font-semibold">
                {Categories.find((val) => val?.value === selectedCategory)
                  ?.label ?? ""}{" "}
                Products
              </h1>
            </div>
            <Carousel data={DiffDatas[selectedCategory] as any} />
          </div>
        </div>

        <div className=" w-full h-[90vh] mt-16 md:mt-0 justify-center items-center grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-10">
          <div className=" border-l-2 border-white pl-8">
            <div className=" text-gradient text-4xl mb-6">Why Shroom City?</div>
            <div className=" text-lg">
              <span className=" text-xl">
                Looking to buy magic mushrooms in Canada?
              </span>
              <br />
              We offer speedy and discrete deliveries right to your door within
              an hour!
              <br />
              Check our delivery area, place an order today, and receive your
              magic mushrooms within 24 hours or less!
            </div>
          </div>
          <div className=" flex justify-center">
            <img src="/assests/whyshroomcity.png" alt="image" />
          </div>
        </div>

        <div className=" w-full md:h-[90vh] h-fit mt-16 md:mt-0 justify-center items-center grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-10">
          <div className=" flex justify-center order-last md:order-first">
            <img
              src="/assests/aboutshroomcity.png"
              alt="image"
              className=" max-h-[50vh] md:max-h-[70vh]"
            />
          </div>
          <div className="border-white border-r-2 pr-4 md:border-l-2 md:pl-8 md:border-r-0">
            <div className=" text-gradient text-4xl mb-6">
              Exceptional Quality!
            </div>
            <div className=" text-lg">
              At Shroom City, we are dedicated to providing you with mushrooms
              of unparalleled quality. Our team of experts carefully curates
              each strain, ensuring that only the finest mushrooms make it to
              our shelves. We believe that by offering top-notch products, we
              can enhance your psychedelic experience and help you unlock new
              dimensions of consciousness.
            </div>

            <div className=" text-gradient text-4xl mb-6 mt-16">
              Ethical and Sustainable Practices!
            </div>
            <div className=" text-lg">
              At Shroom City, we believe in responsible and sustainable
              practices. We prioritize the well-being of our customers and the
              environment. Our mushrooms are cultivated using eco-friendly
              methods, minimizing our ecological im
            </div>
          </div>
        </div>

        <div className="w-full md:h-[90vh] h-fit mt-16 md:mt-0 justify-center items-center grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4 px-4 md:px-10">
          <div className=" flex flex-col gap-4 border-l-2 border-white pl-8">
            <div className=" text-gradient text-4xl mb-6">VISIT OUR STORE</div>
            <div className=" text-lg">
              SHROOM CITY - TORONTO Meet The Best Shroom In The City
              <br />
              <span className=" font-bold mt-6">Working hours:</span>
              <br />
              Monday-Sunday 10:00 AM to 11:00 PM
              <br />
              <span className=" font-bold mt-6"> Address:</span>
              <br />
              188 Spadina Ave, Toronto, ON M5T 3A4, Canada
            </div>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11549.750493389418!2d-79.39735208209021!3d43.63906263764135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b352982d2a06b%3A0x479446ec6338be2c!2sHarbourfront%2C%20Toronto%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sin!4v1692473625178!5m2!1sen!2sin"
              width="95%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="w-full md:h-[90vh] h-fit mt-16 md:mt-0 py-10 md:py-0 bg-app-dark-purple justify-center items-center grid grid-cols-1 md:grid-cols-2 gap-4 md:px-10 px-4">
          <div className=" flex flex-col text-white">
            <div className=" text-4xl font-bold">CONTACT US</div>
            <div className=" text-xl font-semibold mt-6">
              QUESTIONS & INQUIRIES
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField name="First Name" placeholder="First Name" />
              <InputField name="Last Name" placeholder="Last Name" />
              <InputField name="Email" placeholder="Email" />
              <InputField name="Number" placeholder="Number" />
              <div className=" col-span-2">
                <textarea
                  rows={3}
                  placeholder="Message"
                  className=" block min-h-[2.375rem] w-full rounded border px-1.5 py-1 shadow-sm focus:border-gray"
                />
              </div>
            </div>
            <div>
              <Button title="Submit" className=" mt-6" />
            </div>
          </div>
          <div className=" flex flex-col h-fit md:h-96 gap-4 justify-end">
            <div className=" flex gap-4 md:self-end">
              <img
                src="/assests/instagram.png"
                alt="image"
                className=" w-fit"
              />
              <img src="/assests/tiktok.png" alt="image" className=" w-fit" />
            </div>
            <div className=" text-base font-semibold md:self-end">
              2023 Copyright Shroomcity.io | All reserved copyright
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
