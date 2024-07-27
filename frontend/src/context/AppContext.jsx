import { createContext, useState } from "react";
import { useContext } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const AppContext = createContext();
/*
Mengapa Menggunakan invalidateQueries setelah useMutation
Pembaruan Status: Setelah operasi mutasi (seperti sign out), status atau data di server berubah. Untuk memastikan data lokal aplikasi tetap sinkron dengan server, kita menggunakan invalidateQueries untuk menginformasikan react-query bahwa data yang di-cache tidak valid lagi dan perlu di-fetch ulang.
Validasi Token Ulang: Dengan meng-invalidate query validateToken, aplikasi akan memeriksa ulang token pengguna saat berikutnya query ini dijalankan. Ini memastikan bahwa aplikasi mencerminkan status login yang benar setelah pengguna melakukan sign out.
*/

export const AppContextProvider = ({ children }) => {
  const [toast, setToast] = useState(undefined);
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
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
