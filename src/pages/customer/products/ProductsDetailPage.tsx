import { useParams } from "react-router-dom";

const ProductsDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <p>{id}</p>
    </div>
  );
};

export default ProductsDetailPage;
