import Card from "../components/Card";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import Modal from "../components/Modal";

const ProductSection = () => {
  const { data } = useQuery("fishes", apiClient.getAllFish);
  return (
    <div className="container mx-auto py-5 bg-white  max-md:px-3">
      <div className="grid max-sm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {data?.map((fish) => (
          <Card key={fish._id} fish={fish}></Card>
        ))}
        <Modal></Modal>
      </div>
    </div>
  );
};

export default ProductSection;
