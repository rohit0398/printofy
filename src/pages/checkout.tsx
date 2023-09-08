import { Button } from "@/atoms/button";
import { InputField } from "@/atoms/input";
import { Modal } from "@/atoms/modal";
import MultiSelectSearch from "@/atoms/selectSearch";
import { useCart } from "@/context/cartContext";
import { Layout } from "@/layouts";
import api from "@/util/api";
import { wentWrong } from "@/util/helper";
import {
  MapPinIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { floor } from "lodash";

interface FormData {
  name: string;
  address: string;
  type: { [key: string]: string };
  city: string;
  state: string;
  country: string;
  code: string;
  mobile: string;
  email: string;
}

export default function Checkout() {
  const { cartState, cartDispatch } = useCart();
  const [addAddress, setAddAddress] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState<{ [key: string]: any }>();
  const [couponName, setCouponName] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState<{
    type: string;
    price: number;
    date: string;
  }>();
  const { push } = useRouter();
  const { register, handleSubmit, formState, control, watch } =
    useForm<FormData>({
      defaultValues: {
        name: "",
        address: "",
        type: undefined,
        city: "",
        state: "",
        country: "",
        code: "",
        mobile: "",
        email: "",
      },
    });
  const values =
    formState?.isSubmitSuccessful && deliveryDetails?.price
      ? watch()
      : ({} as FormData);

  const grandTotal = useMemo(() => {
    let total = cartState.reduce(
      (total, item) =>
        total + (item.variants ? item.variants[0]?.p : 1) * (item?.count ?? 1),
      0
    );

    if (deliveryDetails?.price) total = total + deliveryDetails?.price;
    if (coupon?.title && (coupon?.minPrice < total || !coupon?.minPrice)) {
      if (coupon?.type === "flat" && coupon?.discount)
        return floor(total - coupon.discount ?? 0);
      else if (coupon?.type === "percent")
        return floor(total - total * (coupon.discount / 100));
    }

    return floor(total);
  }, [cartState, coupon?.title, deliveryDetails]);

  function handlePlaceOrder() {
    const raw = { ...values };
    if (!raw?.name) return toast.error("Please add address.");
    if (cartState.length === 0)
      return toast.error("Please add products to cart");

    raw.type = (raw?.type?.value as any) ?? "";
    setLoading(true);
    api
      .post(`/order`, {
        ...raw,
        total: grandTotal,
        delivery: deliveryDetails,
        products: cartState.map((val) => {
          return {
            _id: val?._id,
            variant: val?.variants && val?.variants[0]?.u,
            count: val?.count,
          };
        }),
      })
      .then((res) => {
        setOrderCreated(true);
        setOrderDetails(res?.data);
        toast.success("Order created successfully");
        cartDispatch({ type: "RESET" });
      })
      .catch(() => wentWrong)
      .finally(() => setLoading(false));
  }

  function handleCountChange(bool: boolean, ind: number, count?: number) {
    if (bool)
      cartDispatch({
        type: "COUNT_CHANGE",
        payload: { ind, count: count ? count + 1 : 2 },
      });
    else
      cartDispatch({
        type: "COUNT_CHANGE",
        payload: { ind, count: count ? count - 1 : 0 },
      });
  }

  async function handleCouponApply() {
    try {
      if (!couponName) return toast.error("Please enter valid coupon");
      setCouponLoading(true);
      const coupon = await api.get(
        `/coupon?limit=1&status=active&title=${couponName}`
      );
      setCouponLoading(false);
      if (Array.isArray(coupon?.data) && coupon?.data.length) {
        const details = coupon?.data[0];
        if (details?.redeem < details?.limit || !details?.limit) {
          if (details?.minPrice < grandTotal || !details?.minPrice) {
            toast.success("Coupon applied successfully");
            return setCoupon(details);
          } else
            toast.error(
              `Minimum order price to apply this coupon should be ${details?.minPrice}`
            );
        } else toast.error("Coupon does not valid anymore!");
      } else toast.error(`Coupon does't exists!`);
      setCoupon({});
    } catch (_ex) {
      toast.error(wentWrong);
      setCouponLoading(false);
      setCoupon({});
    }
  }

  const onSubmit = async (values: any) => {
    setLoading(true);
    api
      .get(`order/delivery?code=${values?.code}`)
      .then((res) => {
        setDeliveryDetails(res?.data);
        setAddAddress(false);
      })
      .catch((ex) => {
        toast.error("Please provide correct postal code");
        setDeliveryDetails({} as any);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      <div className=" py-20">
        <div className=" text-gradient text-4xl font-bold font-aboreto w-fit mx-auto mb-20 text-center">
          {orderCreated ? "DO NOT LEAVE!" : `Cart Checkout`}
          {orderCreated && (
            <div className=" text-white font-aboreto text-lg mx-auto text-center font-medium mt-2">
              FIND{" "}
              <span className=" font-extrabold text-xl">
                PAYMENT INSTRUCTIONS
              </span>{" "}
              BELOW
            </div>
          )}
        </div>
        {orderCreated ? (
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 mx-2">
            <div className=" md:p-4 px-2 py-4 border border-white/40 rounded-lg bg-gray-900">
              <div className="font-semibold md:text-xl text-lg mb-10">
                Order Summary
              </div>
              <div className=" flex flex-col gap-2">
                <div className=" flex sm:items-center gap-1.5 justify-between sm:flex-row flex-col">
                  <div>Order Number:</div>
                  <div className=" font-bold text-lg break-all">
                    {orderDetails?._id}
                  </div>
                </div>
                <div className=" flex sm:items-center gap-1.5 justify-between sm:flex-row flex-col">
                  <div>Total:</div>
                  <div className=" font-bold text-lg">
                    ${orderDetails?.total}
                  </div>
                </div>
                <div className=" flex sm:items-center gap-1.5 justify-between sm:flex-row flex-col">
                  <div>Payment Method:</div>
                  <div className=" font-bold text-lg">e-Transfer(Interac)</div>
                </div>
              </div>
            </div>

            <div className=" md:p-4 px-2 py-4 border border-white/40 rounded-lg bg-gray-900">
              <div className="font-semibold md:text-xl text-lg mb-10">
                E-TRANSFER INSTRUCTIONS
              </div>
              <div className=" flex flex-col gap-2">
                <div>
                  Ensure to put your{" "}
                  <span className=" font-bold text-lg">{`NAME & ORDER NUMBER`}</span>{" "}
                  in the message box
                </div>
                <div className=" sm:flex-row flex-col flex sm:items-center gap-1.5">
                  <span className=" font-bold text-lg">Name: </span>
                  {orderDetails?.eTransfer?.name}
                </div>
                <div className=" sm:flex-row flex-col flex sm:items-center gap-1.5">
                  <span className=" font-bold text-lg">Email: </span>
                  {orderDetails?.eTransfer?.email}
                </div>
                <div className=" sm:flex-row flex-col flex sm:items-center gap-1.5">
                  <span className=" font-bold text-lg">Order total: </span>$
                  {orderDetails?.total}
                </div>
                <div className=" sm:flex-row flex-col flex sm:items-center gap-1.5">
                  <span className=" font-bold text-lg">Message: </span>
                  {orderDetails?._id}
                </div>

                <div className=" my-6">
                  Auto-deposit is enabled, please ensure your order is correct
                  before sending e-transfer
                </div>

                <div className=" font-bold text-lg">
                  In case there is a security question use this
                </div>
                <div className=" flex sm:items-center gap-1.5 sm:flex-row flex-col ">
                  <span className=" font-bold text-lg">Question: </span>
                  {orderDetails?.eTransfer?.question}
                </div>
                <div className=" flex sm:items-center gap-1.5 sm:flex-row flex-col">
                  <span className=" font-bold text-lg">Password: </span>
                  {orderDetails?.eTransfer?.password}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 mx-2">
            <div className="">
              <div className=" md:p-4 px-2 py-4 border border-white/40 rounded-lg">
                <div className=" flex gap-4 justify-between">
                  <div className=" flex items-center gap-2">
                    <MapPinIcon className=" w-8 h-8 text-white" />{" "}
                    <span className=" font-semibold md:text-xl text-lg">
                      Shipping Address
                    </span>
                  </div>
                  <div
                    onClick={() => setAddAddress(true)}
                    className=" cursor-pointer text-app-teal flex items-center gap-2"
                  >
                    <PlusCircleIcon className=" w-8 h-8 " />
                    <span>Add Address</span>
                  </div>
                </div>
                {values?.name && (
                  <div className="flex flex-col gap-1 text-base pl-4 mt-10">
                    <div className=" font-extrabold">{values?.name}</div>
                    <div>
                      {values?.type?.value ?? ""} {values?.address}
                    </div>
                    <div className=" flex gap-1">
                      <span>{values?.city}</span>
                      {/* <span>{values?.state},</span> */}
                      {/* <span>{values?.country}</span> */}
                    </div>
                    <div>{values?.code}</div>
                    <div className=" flex flex-wrap gap-2">
                      <div className="py-1 px-2 bg-gray-800 rounded">
                        {values?.mobile}
                      </div>
                      <div className="py-1 px-2 bg-gray-800 rounded">
                        {values?.email}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="">
              <div className=" p-4 border border-white/40 rounded-lg">
                <div className=" flex gap-4 items-center">
                  <div className=" rounded-full bg-gray-800 p-3">
                    <ShoppingCartIcon className=" w-6 h-6 text-white" />
                  </div>
                  <span className=" font-semibold text-xl">You are buying</span>
                </div>

                {cartState.map((product, ind) => (
                  <div
                    key={ind}
                    className=" flex items-center  gap-4 mt-10 pb-4 border-b border-white/30"
                  >
                    <img
                      src={product?.image}
                      className=" w-16 h-16 object-cover rounded"
                      alt="imgage"
                    />
                    <div className=" flex flex-col grow gap-2 font-semibold">
                      <span>{product?.label}</span>
                      {/* flex sm:flex-row flex-col justify-between */}
                      <div className=" grid sm:grid-cols-2 grid-cols-1 gap-2">
                        <div className=" flex gap-2">
                          {product?.variants && (
                            <span>
                              ${product?.variants[0]?.p}
                              {" /"}
                              {product?.variants[0]?.u}
                            </span>
                          )}
                          <span>X</span> <span>{product?.count ?? 1}</span>
                        </div>
                        <div className=" flex gap-4 text-white">
                          <PlusCircleIcon
                            onClick={() =>
                              handleCountChange(true, ind, product?.count)
                            }
                            className={`w-7 h-7 cursor-pointer`}
                          />
                          <div>{product?.count ?? 1}</div>
                          <MinusCircleIcon
                            onClick={() =>
                              handleCountChange(false, ind, product?.count)
                            }
                            className={`w-7 h-7 cursor-pointer`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex sm:flex-row flex-col items-center justify-between py-2 sm:px-4 px-0 my-5 gap-4 bg-app-dark-gray font-semibold rounded">
                  <span className=" font-aboreto text-sm">Have a coupon?</span>
                  <div className=" flex justify-between gap-2">
                    <input
                      onChange={(e) => setCouponName(e.target?.value)}
                      name="coupon"
                      placeholder="Enter code"
                      className={`block text-white bg-app-dark-gray min-h-[2.375rem] w-full rounded border px-1.5 py-1 shadow-sm focus:border-gray-500`}
                    />
                    <Button
                      onClick={handleCouponApply}
                      disabled={couponLoading}
                      title="Apply"
                    />
                  </div>
                </div>

                <div className=" flex flex-col items-stretch justify-center py-2 sm:px-4 px-0 my-5 gap-4 bg-app-dark-gray font-semibold rounded">
                  {coupon?.title ? (
                    <div className=" self-end bg-app-teal px-2 py-1 rounded text-sm">
                      {`Coupon Applied  -`}
                      <span>
                        {coupon?.type === "flat" && "$"}
                        {coupon?.discount}
                        {coupon?.type === "percent" && "%"}
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div>
                    {deliveryDetails?.price && (
                      <div className=" flex justify-between">
                        <span className=" text-xs opacity-70">
                          Delivery Charges
                        </span>
                        <span>${deliveryDetails?.price}</span>
                      </div>
                    )}
                    <div className=" flex justify-between">
                      <span className=" font-aboreto">Grand Total</span>
                      <span>${grandTotal}</span>
                    </div>
                    {deliveryDetails?.price && (
                      <div className=" ml-auto w-fit">
                        <div className=" text-xs">
                          <span className=" text-xs">Arrival By </span>{" "}
                          {deliveryDetails?.date}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  disabled={loading}
                  onClick={handlePlaceOrder}
                  title="Place Order"
                  className=" w-full"
                />
              </div>
            </div>
          </div>
        )}

        {orderCreated && (
          <div className=" mt-10 flex justify-center">
            <Button onClick={() => push("/#shop")} title="Go To Shop" />
          </div>
        )}
        <Modal open={addAddress} setOpen={(bool) => setAddAddress(bool)}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" max-w-md mb-5 mx-5"
          >
            <div className=" font-aboreto text-gradient text-xl font-bold w-fit text-start mb-5">
              Add Address
            </div>
            <div className="space-y-4">
              <InputField
                formState={formState}
                register={register}
                name="name"
                label="Contact Name"
                rules={{
                  required: "This is a required field.",
                }}
              />
              <InputField
                formState={formState}
                register={register}
                name="email"
                label="Email"
                type="email"
                rules={{
                  required: "This is a required field.",
                }}
              />
              <InputField
                formState={formState}
                register={register}
                name="mobile"
                label="Mobile"
                type="number"
                rules={{
                  required: "This is a required field.",
                }}
              />
              <InputField
                formState={formState}
                register={register}
                name="address"
                label="Address"
                rules={{
                  required: "This is a required field.",
                }}
              />

              <MultiSelectSearch
                options={[
                  { label: "House", value: "house" },
                  { label: "Apartment", value: "apartment" },
                  { label: "Condo", value: "condo" },
                ]}
                control={control}
                rules={{
                  required: "This is a required field.",
                }}
                name="type"
                label="Type"
                formState={formState}
              />

              {/* <InputField
                formState={formState}
                register={register}
                name="landmark"
                label="Landmark"
              /> */}

              <div className=" grid grid-cols-2 gap-4">
                <InputField
                  formState={formState}
                  register={register}
                  name="code"
                  label="Postal Code"
                  rules={{
                    required: "This is a required field.",
                  }}
                />
                <InputField
                  formState={formState}
                  register={register}
                  name="city"
                  label="City"
                  rules={{
                    required: "This is a required field.",
                  }}
                />
              </div>
              {/* <div className=" grid grid-cols-2 gap-4">
                
                <InputField
                  formState={formState}
                  register={register}
                  name="country"
                  label="Country"
                />
                <InputField
                  formState={formState}
                  register={register}
                  name="state"
                  label="State"
                />
              </div> */}
            </div>

            <div className="mt-12 grid grid-cols-2 items-center justify-between gap-x-4">
              <Button type="submit" title="Save" disabled={loading} />
              <Button onClick={() => setAddAddress(false)} title="Cancel" />
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  );
}
