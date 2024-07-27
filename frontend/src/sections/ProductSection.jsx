import Card from "../components/Card";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const ProductSection = () => {
  // apakah penamaan fishes itu terserah?
  const { data } = useQuery("fishes", apiClient.getAllFish);
  console.log(data);
  return (
    <div className="container mx-auto py-5 bg-white">
      <div className="grid max-sm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {data?.map((fish) => (
          <Card key={fish._id} fish={fish}></Card>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
