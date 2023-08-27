import { Button } from "@/atoms/button";
import { InputField } from "@/atoms/input";
import { Modal } from "@/atoms/modal";
import { useCart } from "@/context/cartContext";
import { Layout } from "@/layouts";
import api from "@/util/api";
import { wentWrong } from "@/util/helper";
import {
  MapPinIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  RocketLaunchIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  address: string;
  landmark: string;
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
  const { push } = useRouter();
  const { register, handleSubmit, formState, reset, watch } = useForm<FormData>(
    {
      defaultValues: {
        name: "",
        address: "",
        landmark: "",
        city: "",
        state: "",
        country: "",
        code: "",
        mobile: "",
        email: "",
      },
    }
  );
  const values = formState?.isSubmitSuccessful ? watch() : ({} as FormData);
  const grandTotal = useMemo(() => {
    return cartState.reduce(
      (total, item) =>
        total + (item.variants ? item.variants[0]?.p : 1) * (item?.count ?? 1),
      0
    );
  }, [cartState]);

  function handlePlaceOrder() {
    if (!values?.name) return toast.error("Please add address.");
    if (cartState.length === 0)
      return toast.error("Please add products to cart");

    setLoading(true);
    api
      .post(`/order`, {
        ...values,
        total: grandTotal,
        products: cartState.map((val) => {
          return {
            _id: val?._id,
            variant: val?.variants && val?.variants[0]?.g,
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

  const onSubmit = async () => {
    setAddAddress(false);
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
                <div className=" flex justify-between sm:flex-row flex-col">
                  <div>Order Number:</div>
                  <div className=" font-bold text-lg break-all">
                    {orderDetails?._id}
                  </div>
                </div>
                <div className=" flex justify-between sm:flex-row flex-col">
                  <div>Total:</div>
                  <div className=" font-bold text-lg">
                    ${orderDetails?.total}
                  </div>
                </div>
                <div className=" flex justify-between sm:flex-row flex-col">
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
                <div className=" sm:flex-row flex-col flex">
                  <span className=" font-bold text-lg">Name: </span>
                  {orderDetails?.eTransfer?.name}
                </div>
                <div className=" sm:flex-row flex-col flex">
                  <span className=" font-bold text-lg">Email: </span>
                  {orderDetails?.eTransfer?.email}
                </div>
                <div className=" sm:flex-row flex-col flex">
                  <span className=" font-bold text-lg">Order total: </span>$
                  {orderDetails?.total}
                </div>
                <div className=" sm:flex-row flex-col flex">
                  <span className=" font-bold text-lg">Message: </span>
                  {orderDetails?._id}
                </div>

                <div className=" my-6">
                  Auto-deposit is enabled, please ensure your order is correct
                  before sending e-transfer
                </div>

                <div className=" font-bold text-lg">
                  In case there is a securit question use this
                </div>
                <div className=" flex sm:flex-row flex-col">
                  <span className=" font-bold text-lg">Question: </span>
                  {orderDetails?.eTransfer?.question}
                </div>
                <div className=" flex sm:flex-row flex-col">
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
                    <div>{values?.address}</div>
                    <div>{values?.landmark}</div>
                    <div className=" flex gap-1">
                      <span>{values?.city},</span>
                      <span>{values?.state},</span>
                      <span>{values?.country}</span>
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
                              {product?.variants[0]?.g}g
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

                <div className=" flex items-center justify-between py-2 px-4 my-5 gap-4 bg-gray-800 font-semibold rounded">
                  <span>Grand Total</span>
                  <span>${grandTotal}</span>
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
              <InputField
                formState={formState}
                register={register}
                name="landmark"
                label="Landmark"
              />

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
              <Button type="submit" title="Save" />
              <Button onClick={() => setAddAddress(false)} title="Cancel" />
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  );
}
