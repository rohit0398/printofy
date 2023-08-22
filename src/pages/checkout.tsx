import { Button } from "@/atoms/button";
import { InputField } from "@/atoms/input";
import { Modal } from "@/atoms/modal";
import { Layout } from "@/layouts";
import {
  MapPinIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Checkout() {
  const [addAddress, setAddAddress] = useState(false);
  return (
    <Layout>
      <div className=" py-20">
        <div className=" text-gradient text-4xl font-bold font-aboreto w-fit mx-auto mb-20">
          Cart Checkout
        </div>
        <div className=" grid grid-cols-2 gap-8">
          <div className=" mx-8">
            <div className=" p-4 border border-white/40 rounded-lg">
              <div className=" flex gap-4 justify-between">
                <div className=" flex gap-4 items-center">
                  <MapPinIcon className=" w-8 h-8 text-white" />{" "}
                  <span>Shipping Address</span>
                </div>
                <div
                  onClick={() => setAddAddress(true)}
                  className=" cursor-pointer text-app-teal flex items-center gap-2"
                >
                  <PlusCircleIcon className=" w-8 h-8 " />
                  <span>Add Address</span>
                </div>
              </div>
            </div>
          </div>
          <div className=" mx-8">
            <div className=" p-4 border border-white/40 rounded-lg">
              <div className=" flex gap-4 items-center">
                <div className=" rounded-full bg-gray-800 p-1">
                  <ShoppingCartIcon className=" w-7 h-7 text-white" />
                </div>
                <span>You are buying</span>
              </div>

              <div className=" flex items-center mt-20 gap-4">
                <img
                  src="assests/product.png"
                  className=" w-20 h-20 object-cover rounded"
                />
                <div className=" flex flex-col gap-2 font-semibold">
                  <span>Magic Mushroom</span>
                  <div className=" flex gap-2">
                    <span>$60</span> <span>X</span> <span>1</span>
                  </div>
                </div>
              </div>

              <div className=" flex items-center justify-between py-4 px-4 my-10 gap-4 bg-gray-800 font-semibold rounded">
                <span>Grand Total</span>
                <span>$60</span>
              </div>

              <Button title="Place Order" className=" w-full" />
            </div>
          </div>
        </div>
        <Modal open={addAddress} setOpen={(bool) => setAddAddress(bool)}>
          <form
            // onSubmit={handleSubmit(onSubmit)}
            className=" max-w-md mb-10 mx-5"
          >
            <div className=" text-gradient text-lg font-semibold w-fit text-start mb-10">Add Address</div>
            <div className="space-y-4">
              <InputField name="name" label="Contact Name" />
              <InputField name="email" label="Email" type="email" />
              <InputField name="mobile" label="Mobile" type="number" />
              <InputField name="address" label="Address" />
              <InputField name="landmark" label="Landmark" />

              <div className=" grid grid-cols-2 gap-4">
                <InputField name="code" label="Postal Code" />
                <InputField name="country" label="Country" />
              </div>
              <div className=" grid grid-cols-2 gap-4">
                <InputField name="city" label="City" />
                <InputField name="state" label="State" />
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 items-center justify-between gap-x-4">
              <Button title="Save" />
              <Button title="Cancel" />
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  );
}
