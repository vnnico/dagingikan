import { useMutation, useQueryClient } from "react-query";
import { BsBoxArrowRight } from "react-icons/bs";
import { useAppContext } from "../context/AppContext";
import * as apiClient from "../api-client";

const LogoutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.logout, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Sign Out!", type: "SUCCESS" });
    },
    onError: (error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onClick = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={onClick}
      className="flex items-center text-xl md:text-3xl text-white px-3 font-bold hover:text-yellow-300 "
    >
      <BsBoxArrowRight />
    </button>
  );
};

export default LogoutButton;
