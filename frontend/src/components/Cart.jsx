"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BsPlusLg, BsDashLg } from "react-icons/bs";
import { useAppContext } from "../context/AppContext";

import { useMutation } from "react-query";
import * as orderAPI from "../api/order";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { carts, open, setOpen, addCart, removeCart, removeAllCarts } =
    useAppContext();
  const { showToast } = useAppContext();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setTotal(carts.reduce((acc, cart) => acc + cart.quantity * cart.price, 0));
  }, [carts]);

  const mutation = useMutation(orderAPI.orderItems, {
    onSuccess: async (data) => {
      showToast({ message: "Payment created", type: "SUCCESS" });
      setOpen(!open);
      removeAllCarts();
      navigate(`/order/${data.orderId}`);
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const makePayment = () => {
    if (carts.length > 0) {
      if (confirm("Are you sure to proceed the transaction?") === true)
        mutation.mutate({ carts, amount: total });
    }
  };
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden ">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 ">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700 "
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto">
                  <div className="flex items-start justify-between bg-gray-950 py-5 px-4">
                    <DialogTitle className="text-lg font-medium text-yellow-300">
                      Shopping cart
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-yellow-300 hover:text-yellow-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 py-5 px-4">
                    <div className="flow-root ">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {carts &&
                          carts.map((cart) => (
                            <li key={cart.id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  alt={cart.imageAlt}
                                  src={`/images/${cart.imageSrc}`}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={cart.href}>{cart.name}</a>
                                    </h3>
                                    <p className="ml-4">
                                      {(
                                        cart.price * cart.quantity
                                      ).toLocaleString("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                      })}
                                    </p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {cart.weight}g
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">
                                    Qty {cart.quantity}
                                  </p>

                                  <div className="flex gap-1">
                                    <button
                                      type="button"
                                      className="bg-yellow-400 text-white font-bold py-2 px-2 text-lg rounded-full hover:bg-yellow-600"
                                      onClick={() => addCart(cart)}
                                    >
                                      <BsPlusLg />
                                    </button>
                                    <button
                                      type="button"
                                      className="bg-yellow-400 text-white font-bold py-2 px-2 text-lg rounded-full hover:bg-yellow-600"
                                      onClick={() => removeCart(cart)}
                                    >
                                      <BsDashLg />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        {carts && carts.length === 0 && (
                          <p className="text-gray-950 text-md ">
                            No item found
                          </p>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6 bg-gray-950 text-white">
                  <div className="flex justify-between text-base font-medium ">
                    <p>Subtotal</p>
                    <p>
                      {total.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </p>
                  </div>
                  <p className="mt-0.5 text-sm">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <button
                    className="w-full mt-6 px-6 py-4 mb-2 rounded-md font-medium bg-yellow-400 hover:bg-yellow-600"
                    disable={`${carts.length > 0}? ${false} : ${true}`}
                    onClick={makePayment}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
