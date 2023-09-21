import { Loader } from "@/atoms/loader";
import { Product } from "@/atoms/product";
import { IProduct } from "@/atoms/productCarousel";
import { useCategories } from "@/context/categoriesContext";
import { Layout } from "@/layouts";
import api from "@/util/api";
import { wentWrong } from "@/util/helper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Products() {
  const { push, query } = useRouter();
  const { categories } = useCategories();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [onSale, setOnSale] = useState<any[]>([]);

  // Loading the categories, products, and on sale products
  useEffect(() => {
    setLoading(true);
    Promise.all([getOnSaleProducts()])
      .then((values) => {
        const sale = values[0]?.data;
        setOnSale(sale);
      })
      .catch(() => toast.error("Something went wrong! Please refresh page"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let url = "";
    if (query?.categoryId) {
      url = `/product?categoryId=${query?.categoryId}&categoryStatus=true`;
    } else url = `/product?categoryStatus=true`;
    setLoading(true);
    api
      .get(url)
      .then((res) => setProducts(res?.data))
      .catch(() => toast.error(wentWrong))
      .finally(() => setLoading(false));
  }, [query]);

  async function getOnSaleProducts() {
    return api.get(`/product?limit=10&sort=asc&categoryStatus=true`);
  }

  function handleCategorySelect(_id: string) {
    push(`/products?categoryId=${_id}&status=true`);
  }

  return (
    <Layout>
      <div className=" py-20">
        <div className="mb-20 text-center">
          <div
            id="categories"
            className=" flex flex-col mt-4 sm:mt-20 relative"
          >
            {loading && <Loader />}
            <div className="flex gap-2 flex-wrap mx-auto justify-center font-aboreto">
              {categories.map((val, key) => (
                <div
                  key={key}
                  onClick={() => handleCategorySelect(val._id)}
                  className={`${
                    query?.categoryId === val._id
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

            <div className="container mt-10 sm:mt-20 mx-auto p-6 md:p-2">
              <div className=" my-10">
                <h1 className="text-3xl mb-4 text-center font-semibold font-aboreto">
                  {categories.find((val) => val?._id === query?.categoryId)
                    ?.label ?? "Shop"}
                </h1>
              </div>
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-16">
                {Array.isArray(products) &&
                  products.length &&
                  products.map((val: IProduct, ind: number) => (
                    <Product product={val} key={ind} />
                  ))}
              </div>
            </div>
          </div>

          {/* Trending Sale section */}

          <div></div>
          <div className=" flex flex-col mt-10 sm:mt-20 relative">
            <div className="container mx-auto p-6 md:p-2">
              <div className=" my-10">
                <h1 className="text-3xl mb-4 text-center font-semibold font-aboreto">
                  Trending Sale
                </h1>
              </div>
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-16">
                {Array.isArray(onSale) &&
                  onSale.length &&
                  onSale.map((val: IProduct, ind: number) => (
                    <Product product={val} key={ind} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
