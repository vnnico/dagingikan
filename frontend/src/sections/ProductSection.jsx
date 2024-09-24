import Card from "../components/Card";
import Modal from "../components/Modal";

const ProductSection = ({ fishes }) => {
  return (
    <div className="container mx-auto py-5 bg-white  max-md:px-3">
      <div className="grid max-sm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {fishes?.map((fish) => (
          <Card key={fish._id} fish={fish}></Card>
        ))}
        <Modal></Modal>
      </div>
    </div>
  );
};

export default ProductSection;
