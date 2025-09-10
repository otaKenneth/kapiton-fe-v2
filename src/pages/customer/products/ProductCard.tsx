import { Link } from "react-router-dom";
import { formatPeso } from "@lib/utils";

type ProductCardProps = {
  product: any;
  onQuickAdd?: (product: any) => void;
};

const ProductCard = ({product, onQuickAdd, ...otherProps} : ProductCardProps) => {
  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (onQuickAdd) {
      onQuickAdd(product);
    }
  }

  return (
    <>
      <Link to={`/products/${product.id}`} className="flex flex-col px-2 sm:px-4 md:px-6 mb-4">
        <div className="h-48 sm:h-56 md:h-[14rem] w-full bg-white rounded-md flex items-center justify-center">
          <img className="object-cover w-full h-full rounded-md" />
        </div>

        <div className="flex justify-between items-start w-full mt-2">
          <div>
            <h2
              className="mt-4 font-secondary line-clamp-2 text-base sm:text-lg font-semibold text-left leading-[1.3rem]"
              style={{ minHeight: "3rem" }}
            >
              {product.product_name}
            </h2>

            <div className="mt-2 flex items-center gap-x-2">
              <h1 className="font-primary">
                {formatPeso(
                  product.discounted_price ? product.discounted_price : product.product_price
                )}
              </h1>
              {product.discounted_price && (
                <p className="line-through italic text-xs">
                  {formatPeso(product.product_price)}
                </p>
              )}
            </div>
          </div>
          <div className="relative flex flex-col justify-center items-center"
            style={{ height: '100%'}}
          >
            <button
              type="button"
              onClick={handleQuickAdd}
              className="bottom-4 bg-primary text-primaryContrast px-4 py-2 rounded-md text-sm hover:bg-primary/90 transition"
              aria-label="Quick Add"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M6 6h15l-1.5 9h-13z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <circle cx="9" cy="20" r="1" fill="currentColor"/>
                <circle cx="18" cy="20" r="1" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex justify-between w-full items-center mt-4">
          <span className="flex gap-x-2 items-center text-sm">
              <div className="h-7 w-7 rounded-md bg-white"></div>
              <p>{product.vendor.vendorbusinessdetails.shop_name}</p>
          </span>
          <h1 className="text-xs sm:text-sm opacity-80">{product.reviews ? `${product.reviews} Stars` : 'No Reviews'}</h1>
        </div>
      </Link>
    </>
  );
}

export default ProductCard;