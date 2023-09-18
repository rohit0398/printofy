import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export function DropDown({
  title,
  data,
  handleClick
}: {
  title: string;
  data: { label: string; image?: string }[];
  handleClick?: (data?: any) => void;
}) {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className=" flex w-fit items-center justify-center rounded-md text-white hover:bg-app-purple px-3 py-2 text-sm font-medium uppercase">
          {title}
          <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 p-4 w-max origin-top-right divide-y divide-gray-100 rounded-md bg-black shadow-lg border border-white ring-1 ring-white ring-opacity-5 focus:outline-none">
            {Array.isArray(data) &&
              data.map((val, ind) => (
                <Menu.Item key={ind}>
                  {({ active }) => (
                    <button
                      onClick={() => handleClick?.(val)}
                      className={`${
                        active ? "text-white" : "text-white"
                      } group flex gap-4 w-full items-center rounded-md px-2 py-2 text-lg font-medium uppercase hover:text-app-purple`}
                    >
                      {val?.image && (
                        <div>
                          <img
                            src={val?.image}
                            className=" w-7 h-7 object-fill"
                            alt="imgage"
                          />
                        </div>
                      )}
                      <span>{val.label}</span>
                    </button>
                  )}
                </Menu.Item>
              ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
