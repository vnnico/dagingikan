import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as authenticationAPI from "../api/authentication";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [toast, setToast] = useState(undefined);
  const [carts, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const searchItem = (e) => {
    setSearch(e.target.value);
  };

  const toggleCart = () => {
    setOpen(!open);
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const addCart = (fish, cb = null) => {
    const cart = carts.find((cart) => cart.id === fish.id);
    if (cart) {
      setCart(
        carts.map((cart) =>
          cart.id === fish.id ? { ...cart, quantity: cart.quantity + 1 } : cart
        )
      );
    } else {
      setCart([
        ...carts,
        {
          id: fish._id,
          name: fish.name,
          weight: fish.weight,
          price: fish.price,
          quantity: 1,
          imageSrc: fish.image,
          imageAlt: fish.name,
        },
      ]);
    }
    cb ? cb() : null;
  };

  const removeCart = (fishCart) => {
    const cart = carts.find((cart) => cart.id === fishCart.id);
    if (cart.quantity === 1) {
      setCart(carts.filter((cart) => cart.id !== fishCart.id));
    } else {
      setCart(
        carts.map((cart) =>
          cart.id === fishCart.id
            ? { ...cart, quantity: cart.quantity - 1 }
            : cart
        )
      );
    }
  };

  const { isError } = useQuery(
    "validateToken",
    authenticationAPI.validateToken,
    {
      retry: false,
    }
  );

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
        carts,
        toggleCart,
        toggleModal,
        open,
        setOpen,
        openModal,
        setOpenModal,
        addCart,
        removeCart,
        search,
        searchItem,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        ></Toast>
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
