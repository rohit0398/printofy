import { Layout } from "@/layouts";
import { InputField } from "@/atoms/input";
import { Button } from "@/atoms/button";
import { ProductCarousel, IProduct } from "@/atoms/productCarousel";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCart } from "@/context/cartContext";

export type ICategories = "mushroom" | "edible" | "microdose" | "merch";

const Categories = [
  {
    label: "Magic Mushroom",
    value: "mushroom",
    icon: { light: "musroom-icon.png", dark: "musroom-dark-icon.png" },
  },
  {
    label: "Edible",
    value: "edible",
    icon: { light: "ediable-icon.png", dark: "ediable-dark-icon.png" },
  },
  {
    label: "Microdose",
    value: "microdose",
    icon: { light: "microdose-icon.png", dark: "microdose-dark-icon.png" },
  },
  {
    label: "Merch",
    value: "merch",
    icon: { light: "store-icon.png", dark: "store-dark-icon.png" },
  },
];

const DiffDatas = {
  mushroom: [
    {
      id: 1,
      label: "Albino Zilla",
      value: "albinoZilla",
      variant: [
        { g: 7, p: 60 },
        { g: 14, p: 100 },
        { g: 28, p: 190 },
      ],
    },
    {
      id: 2,
      label: "Gold Members",
      value: "goldMembers",
      variant: [
        { g: 7, p: 60 },
        { g: 14, p: 100 },
        { g: 28, p: 190 },
      ],
    },
    {
      id: 3,
      label: "Gold Teachers",
      value: "goldTeachers",
      variant: [
        { g: 7, p: 60 },
        { g: 14, p: 100 },
        { g: 28, p: 190 },
      ],
    },
    {
      id: 4,
      label: "Penis Envy",
      value: "penisEnvy",
      variant: [
        { g: 7, p: 60 },
        { g: 14, p: 100 },
        { g: 28, p: 190 },
      ],
    },
    {
      id: 5,
      label: "Trinity",
      value: "trinity",
      variant: [
        { g: 7, p: 60 },
        { g: 14, p: 100 },
        { g: 28, p: 190 },
      ],
    },
    {
      id: 6,
      label: "Albino Teachers",
      value: "albinoTeachers",
      variant: [
        { g: 7, p: 70 },
        { g: 14, p: 120 },
        { g: 28, p: 230 },
      ],
    },
    {
      id: 7,
      label: "Mckilla Gorilla",
      value: "mckillaGorilla",
      variant: [
        { g: 7, p: 70 },
        { g: 14, p: 120 },
        { g: 28, p: 230 },
      ],
    },
    {
      id: 8,
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
      id: 9,
      label: "Dark Chocolate Bar",
      value: "darkChocolate",
      variant: [{ g: 4, p: 50 }],
    },
    {
      id: 10,
      label: "Milk Chocolate Bar",
      value: "milkChocolate",
      variant: [{ g: 4, p: 50 }],
    },
    {
      id: 11,
      label: "Peach Gummies",
      value: "peachGummies",
      variant: [{ g: 3, p: 45 }],
    },
    {
      id: 12,
      label: "Blueberry Gummies",
      value: "blueGummies",
      variant: [{ g: 3, p: 45 }],
    },
    {
      id: 13,
      label: "Chocolate Gummies",
      value: "chocolateGummies",
      variant: [{ g: 3, p: 45 }],
    },
  ],
  microdose: [
    {
      id: 14,
      label: "Focus capsules",
      value: "focusCapsules",
      variant: [{ p: 25 }],
    },
    {
      id: 15,
      label: "Anxiety capsule",
      value: "anxietyCapsules",
      variant: [{ p: 25 }],
    },
  ],
  merch: [
    {
      id: 16,
      label: "Hoodie",
      value: "hoodie",
      variant: [{ p: 120 }],
    },
    {
      id: 17,
      label: "Short",
      value: "short",
      variant: [{ p: 95 }],
    },
    {
      id: 18,
      label: "Tee",
      value: "tee",
      variant: [{ p: 55 }],
    },
    {
      id: 19,
      label: "Cap",
      value: "cap",
      variant: [{ p: 45 }],
    },
    {
      id: 20,
      label: "Bucket",
      value: "bucket",
      variant: [{ p: 35 }],
    },
    {
      id: 21,
      label: "Tote",
      value: "tote",
      variant: [{ p: 25 }],
    },
  ],
};

export default function Home() {
  const { push } = useRouter();
  const { cartDispatch } = useCart();

  const { register } = useForm<FormData>({
    defaultValues: {},
  });

  const [selectedCategory, setSelectedCategory] =
    useState<ICategories>("mushroom");

  function scrollScreen() {
    // Scroll smoothly to the new position
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: "smooth",
    });
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
              <div className=" px-2 md:px-10 mt-[15%] md:-mt-20">
                <div className=" hidden md:inline-block">
                  <img
                    src="assests/shroom-logo-small.png"
                    className="max-w-[6rem] w-fit object-cover "
                  />
                </div>
                <div className=" hidden md:block text-3xl text-white font-bold custom-purple-text-shadow">
                  Welcome to
                </div>
                <div className=" md:text-7xl text-6xl text-app-purple font-semibold custom-white-text-shadow">
                  SHROOM CITY
                </div>
                <div className=" md:text-3xl text-2xl text-white font-bold custom-purple-text-shadow">
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
          <div id="on-sale"></div>
          <div className=" flex flex-col mt-20">
            <div className="flex gap-2 flex-wrap mx-auto justify-center font-aboreto">
              {Categories.map((val, key) => (
                <div
                  key={key}
                  onClick={() => setSelectedCategory(val.value as ICategories)}
                  className={`${
                    selectedCategory === val.value
                      ? "bg-app-purple/50 text-white"
                      : "bg-[#ffffff33] backdrop-blur-sm text-white"
                  } cursor-pointer w-44 md:w-64 py-2 px-1 md:p-4 flex gap-2 md:gap-4 items-center justify-center rounded-md hover:ring ring-app-purple transition duration-500`}
                >
                  <div>
                    <img
                      src={`assests/${val.icon.light}`}
                      className=" md:w-8 md:h-8 w-6 h-6 object-fill"
                    />
                  </div>
                  <div className=" md:text-base text-xs font-bold truncate">
                    {val?.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="container mx-auto p-6 md:p-2">
              <div className=" my-10">
                <h1 className="text-3xl mb-4 text-center font-semibold font-aboreto">
                  {Categories.find((val) => val?.value === selectedCategory)
                    ?.label ?? ""}{" "}
                  Products
                </h1>
              </div>
              <ProductCarousel
                data={DiffDatas[selectedCategory] as any}
                handelProductSelect={handleProductClick}
              />
            </div>
          </div>

          <div className=" w-full md:h-[90vh] h-fit mt-16 md:mt-0 justify-center items-center grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-10">
            <div className=" md:border-l-2 md:border-white border-none md:pl-8 pl-0">
              <div className=" text-gradient text-4xl mb-6 font-aboreto font-bold">
                WHAT IS SHROOM CITY?
              </div>
              <div className=" text-lg">
                Welcome to Shroom City, your ultimate destination for
                psychedelic mushrooms! We are thrilled to introduce you to our
                unique selection of high-quality mushrooms that will take you on
                a mind-bending journey like no other. Allow us to share with you
                why Shroom City is the go-to store for your psychedelic
                exploration.
              </div>
            </div>
            <div className=" flex justify-center md:order-last order-first">
              <img
                src="/assests/what-is-mushroom.png"
                alt="image"
                className=" w-[50%] md:w-auto"
              />
            </div>
          </div>

          <div className=" text-center text-gradient text-4xl md:mt-16 mt-20 w-fit mx-auto font-aboreto font-bold">
            WHY SHROOM CITY?
          </div>
          <div className=" w-full h-fit mt-2 md:mt-0 py-5 md:py-10 px-4 md:px-10 justify-center items-center grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className=" flex justify-center order-last md:order-first">
              <img
                src="/assests/whyshroomcity.png"
                alt="image"
                className=" max-h-[50vh] md:max-h-[70vh]"
              />
            </div>
            <div className="pr-4">
              <div className=" text-app-teal text-xl mb-3">
                1: Exceptional Quality
              </div>
              <div className=" text-lg">
                At Shroom City, we are dedicated to providing you with mushrooms
                of unparalleled quality. Our team of experts carefully curates
                each strain, ensuring that only the finest mushrooms make it to
                our shelves. We believe that by offering top-notch products, we
                can enhance your psychedelic experience and help you unlock new
                dimensions of consciousness.
              </div>

              <div className=" text-app-teal text-xl mb-3 mt-10">
                2. Extensive Variety
              </div>
              <div className=" text-lg">
                {`As residents of Shroom City, we take pride in our vast selection
                of mushroom strains. From classic varieties to rare and exotic
                species, our store offers a diverse range to suit every
                individual's preferences. Whether you're seeking a profound
                spiritual journey or a joyous and creative exploration, Shroom
                City has the perfect mushroom for you.`}
              </div>
            </div>
          </div>

          <div className=" w-full h-fit md:py-10 pt-10 mt-0 justify-center items-center grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-10">
            <div className=" md:border-l-2 md:border-white md:pl-8">
              <div className=" text-app-teal text-xl mb-3">
                3. Rigorous Safety Standards
              </div>
              <div className=" text-lg">
                Your safety is of paramount importance to us. We strictly adhere
                to rigorous safety standards throughout the cultivation and
                distribution process. Our mushrooms are grown under controlled
                conditions, ensuring a clean and contaminant-free product. With
                Shroom City, you can embark on your psychedelic adventure with
                confidence and peace of mind.
              </div>

              <div className=" text-app-teal text-xl mb-3 mt-10">
                4. Ethical and Sustainable Practices
              </div>
              <div className=" text-lg">
                At Shroom City, we believe in responsible and sustainable
                practices. We prioritize the well-being of our customers and the
                environment. Our mushrooms are cultivated using eco- friendly
                methods, minimizing our ecological impact. By choosing Shroom
                City, you support ethical business practices and contribute to
                the preservation of our planet.
              </div>
            </div>
            <div className=" flex justify-center">
              <img src="/assests/safty.png" alt="image" />
            </div>
          </div>

          <div className=" w-full h-fit py-10 mt-0 justify-center items-center grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-10">
            <div className=" flex justify-center order-last md:order-first py-5 md:py-0">
              <img
                src="/assests/guidance.png"
                alt="image"
                className=" max-h-[50vh] md:max-h-[70vh]"
              />
            </div>
            <div className="pr-4">
              <div className=" text-app-teal text-xl mb-3">
                5. Expert Guidance and Support
              </div>
              <div className=" text-lg">
                {`We understand that embarking on a psychedelic journey can be
                both exciting and intimidating. That's why our knowledgeable
                team is here to guide and support you every step of the way. We
                are passionate about psychedelics and are well-versed in their
                effects. Count on us to provide you with expert advice, answer
                your questions, and ensure a safe and transformative experience.`}
                <br />
                <br />
                {`Shroom City is more than just a store; it's a gateway to
                mind-altering experiences that can expand your consciousness and
                foster personal growth. With our commitment to quality, safety,
                and sustainability, we have earned a reputation as the premier
                destination for frictional psychedelic mushrooms.`}
              </div>
            </div>
          </div>

          <div
            id="location-contact"
            className="w-full h-fit md:h-[90vh] mt-16 md:mt-0 justify-center items-center grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4 px-4 md:px-10"
          >
            <div className=" flex flex-col gap-4 md:border-l-2 md:border-white md:pl-8">
              <div className=" text-gradient text-4xl mb-6 font-aboreto font-bold">
                VISIT OUR STORE
              </div>
              <div className=" text-lg">
                SHROOM CITY - TORONTO Meet The Best Shroom In The City
                <br />
                <span className=" font-bold mt-6 text-app-teal">
                  Working hours:
                </span>
                <br />
                Monday-Sunday 10:00 AM to 11:00 PM
                <br />
                <span className=" font-bold mt-6 text-app-teal"> Address:</span>
                <br />
                188 Spadina Ave, Toronto, ON M5T 3A4, Canada
              </div>
            </div>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11549.750493389418!2d-79.39735208209021!3d43.63906263764135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b352982d2a06b%3A0x479446ec6338be2c!2sHarbourfront%2C%20Toronto%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sin!4v1692473625178!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </Layout>
      <div className="bg-app-dark-gray">
        <div className=" container">
          <div className=" w-full h-fit mt-16 md:mt-0 py-10 md:py-20  justify-center items-center grid grid-cols-1 md:grid-cols-2 gap-4 md:px-10 px-4">
            <div className=" flex flex-col text-white">
              <div className=" text-4xl font-bold font-aboreto">CONTACT US</div>
              <div className=" text-xl font-semibold mt-6 mb-2">
                QUESTIONS & INQUIRIES
              </div>
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  register={register}
                  name="First Name"
                  placeholder="First Name"
                />
                <InputField
                  register={register}
                  name="Last Name"
                  placeholder="Last Name"
                />
                <InputField
                  register={register}
                  name="Email"
                  placeholder="Email"
                />
                <InputField
                  register={register}
                  name="Number"
                  placeholder="Number"
                />
                <div className=" col-span-2">
                  <textarea
                    rows={3}
                    placeholder="Message"
                    className=" block min-h-[2.375rem] w-full rounded border px-1.5 py-1 shadow-sm focus:border-gray bg-app-dark-gray"
                  />
                </div>
              </div>
              <div>
                <Button type="submit" title="Submit" className=" mt-6" />
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
      </div>
    </>
  );
}
