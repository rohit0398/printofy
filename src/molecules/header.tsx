import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useCart } from "@/context/cartContext";
import { toast } from "react-toastify";
import { DropDown } from "@/atoms/dropdown";
import { AnimateButtonContainer } from "./animateContainer";

const navigation: any[] = [
  // { name: "Categories", href: "/#categories" },
  // { name: "About Us", href: "/#about-us" },
  // { name: "Shop Location", href: "/#shop-location" },
  // { name: "Contact Us", href: "/#contact-us" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export function Header() {
  const { push, query } = useRouter();
  const { cartState } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [selected, setSelected] = useState("");

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log("query", query);
  }, [query]);

  return (
    <Disclosure
      as="nav"
      className={`w-full h-fit sticky top-0 z-50 transition duration-500 ${
        scrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 md:flex-none items-center justify-center sm:items-stretch sm:justify-start">
                <div
                  onClick={() => push("/")}
                  className="flex flex-shrink-0 items-center cursor-pointer"
                >
                  <img
                    className="h-20 w-auto"
                    src="assets/logo.png"
                    alt="Your Company"
                  />
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <AnimateButtonContainer>
                  <button
                    onClick={() => push("/#contact-us")}
                    type="button"
                    className="relative rounded-md bg-gray-800 px-3 py-1 text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    Contact Us
                  </button>
                </AnimateButtonContainer>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden bg-black absolute top-14 left-0 right-0 z-50">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  onClick={() => setSelected(item.href)}
                  className={classNames(
                    selected === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
