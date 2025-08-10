import ProductDetail from "./ProductDetail";
import RelatedProducts from "./RelatedProducts";
import ProductReviews from "./ProductReviews";

const ProductsDetailPage = () => {
  return (
    <div className="elementor">
      <ProductDetail />
      <RelatedProducts />
      <ProductReviews />
    </div>
  );
};

export default ProductsDetailPage;
