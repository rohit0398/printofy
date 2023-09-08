import { Layout } from "@/layouts";
import { InputField } from "@/atoms/input";
import { Button } from "@/atoms/button";
import { ProductCarousel, IProduct } from "@/atoms/productCarousel";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCart } from "@/context/cartContext";
import api from "@/util/api";
import { wentWrong } from "@/util/helper";
import { Loader } from "@/atoms/loader";

export type ICategories = "mushroom" | "edible" | "microdose" | "merch";

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
  const [selectedCategory, setSelectedCategory] =
    useState<ICategories>("mushroom");
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [onSale, setOnSale] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [ageConfirmation, setAgeConfirmation] = useState(false);

  const { register } = useForm<FormData>({
    defaultValues: {},
  });

  useEffect(() => {
    setLoading(true);
    Promise.all([getCategories(), getProducts(), getOnSaleProducts()])
      .then((values) => {
        const categories = values[0]?.data;
        const products = values[1]?.data;
        const sale = values[2]?.data;
        setCategories(categories);
        setProducts(products);
        setOnSale(sale);
      })
      .catch(() => toast.error("Something went wrong! Please refresh page"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const is19Plus = localStorage.getItem("19plus");
    if (is19Plus === "true") setAgeConfirmation(false);
    else setAgeConfirmation(true);
  }, []);

  async function getCategories() {
    return api.get(`/category`);
  }

  async function getProducts() {
    return api.get(`/product`);
  }

  async function getOnSaleProducts() {
    return api.get(`/product?limit=10&sort=asc`);
  }

  function handleCategorySelect(_id: ICategories) {
    setLoading(true);
    setSelectedCategory(_id as ICategories);
    api
      .get(`/product?categoryId=${_id}`)
      .then((res) => setProducts(res?.data))
      .catch(() => toast.error(wentWrong))
      .finally(() => setLoading(false));
  }

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

  function hanldeAgeConfirmation() {
    setAgeConfirmation(false);
    localStorage.setItem("19plus", "true");
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
              <source src="/assets/shroom-video4.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className=" flex justify-center items-center circular-gradient top-0 left-0 right-0 md:left-[20%] md:right-[-20%] absolute -z-10 h-[calc(100vh-4rem)]">
              <img
                src="assets/shroom-logo.png"
                className=" max-w-[14rem] md:max-w-[24rem] w-fit object-cover transition duration-500"
                alt="imgage"
              />
            </div>

            <div className=" flex flex-col gap-5 justify-start text-center pb-6 md:text-left md:justify-center md:pb-0 w-full h-full relative">
              <div className=" px-2 md:px-4 mt-[10%] md:-mt-20">
                <div className=" hidden md:inline-block mb-4">
                  <img
                    src="assets/shroom-logo-small.png"
                    className="max-w-[6rem] w-fit object-cover "
                    alt="imgage"
                  />
                </div>
                <div className=" md:text-3xl text-2xl text-white font-medium">
                  Welcome To
                </div>
                <div className=" md:text-5xl text-4xl text-app-teal font-semibold my-2 md:my-4">
                  SHROOM CITY
                </div>
                <div className=" md:text-3xl text-2xl text-white font-medium leading-tight">
                  Where The Magic Happens
                </div>
              </div>
              <div className="px-2 md:px-4 mt-auto mb-16 md:mt-4 md:mb-0 ">
                <Button
                  onClick={scrollScreen}
                  title="Explore More"
                  className=""
                />
              </div>
            </div>
          </div>

          <div className=" flex flex-col mt-20 relative">
            {loading && <Loader />}
            <div className="flex gap-2 flex-wrap mx-auto justify-center font-aboreto">
              {categories.map((val, key) => (
                <div
                  key={key}
                  onClick={() => handleCategorySelect(val._id)}
                  className={`${
                    selectedCategory === val._id
                      ? "bg-app-purple text-white"
                      : "bg-[#ffffff33] backdrop-blur-sm text-white"
                  } cursor-pointer w-44 md:w-52 py-2 px-1 md:p-4 flex flex-col gap-2 md:gap-4 items-center justify-center rounded-md hover:ring ring-app-purple transition duration-500`}
                >
                  <div>
                    <img
                      src={`${val?.image}`}
                      className=" md:w-16 md:h-16 w-6 h-6 object-fill"
                      alt="imgage"
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
                  {categories.find((val) => val?.value === selectedCategory)
                    ?.label ?? ""}{" "}
                  Shop
                </h1>
              </div>
              <ProductCarousel
                data={products as any}
                handelProductSelect={handleProductClick}
              />
            </div>
          </div>

          <div id="trending-sale"></div>
          <div className=" flex flex-col mt-20 relative">
            <div className="container mx-auto p-6 md:p-2">
              <div className=" my-10">
                <h1 className="text-3xl mb-4 text-center font-semibold font-aboreto">
                  Trending Sale
                </h1>
              </div>
              <ProductCarousel
                data={onSale as any}
                handelProductSelect={handleProductClick}
              />
            </div>
          </div>

          <div className=" w-full md:h-[90vh] h-fit mt-16 md:mt-0 justify-center items-center grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-10 py-8 md:py-0 relative">
            <div className=" absolute left-0 right-0 md:top-[10%] top-0 bottom-0 -z-10 bg-app-dark-gray"></div>
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
                src="/assets/what-is-mushroom.png"
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
                src="/assets/whyshroomcity.png"
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
              <img src="/assets/safty.png" alt="image" />
            </div>
          </div>

          <div className=" w-full h-fit py-10 mt-0 justify-center items-center grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-10">
            <div className=" flex justify-center order-last md:order-first py-5 md:py-0">
              <img
                src="/assets/guidance.png"
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
                SHROOM CITY - TORONTO
                <br />
                <span>Meet The Best Shroom In The City</span>
                <br />
                <span className=" font-bold mt-6 text-app-teal">
                  Working hours:
                </span>
                <br />
                Every Day 11:00 AM to 11:00 PM
                <br />
                <span className=" font-bold mt-6 text-app-teal"> Address:</span>
                <br />
                188 Spadina Ave, Toronto, ON M5T 3A4, Canada
              </div>
            </div>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.9198164089735!2d-79.39970142374685!3d43.64983657110227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34db585c2261%3A0x669ee841e0f81137!2s188%20Spadina%20Ave.%2C%20Toronto%2C%20ON%20M5T%203A4%2C%20Canada!5e0!3m2!1sen!2sin!4v1694168994188!5m2!1sen!2sin"
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
                  onClick={() =>
                    window.open(
                      "https://instagram.com/shroomcityto?igshid=MzRlODBiNWFlZA==",
                      "_blank"
                    )
                  }
                  src="/assets/instagram.png"
                  alt="image"
                  className=" w-10 h-10 cursor-pointer"
                />
                <img
                  onClick={() =>
                    window.open("https://www.tiktok.com/@shroomcityto?_t=8fTXITKXsAg&_r=1", "_blank")
                  }
                  src="/assets/tiktok.png"
                  alt="image"
                  className=" w-10 h-10 cursor-pointer"
                />
              </div>
              <div className=" text-base font-semibold md:self-end">
                2023 Copyright Shroomcity.xyz | All reserved copyright
              </div>
            </div>
          </div>
        </div>
      </div>
      {ageConfirmation && (
        <div className=" fixed inset-0 z-50 flex flex-col justify-center items-center bg-black/80">
          <div className=" text-4xl font-aboreto mb-10 text-center">
            Please verify your age to enter.
          </div>
          <div className=" flex flex-col sm:flex-row gap-4">
            <Button onClick={hanldeAgeConfirmation} title="I am 19 or older" />
            <Button
              onClick={() =>
                toast.error(
                  "Sorry, you must be 19 or over to enter this website."
                )
              }
              variant="out-lined"
              title="I am under 19"
            />
          </div>
        </div>
      )}
    </>
  );
}
