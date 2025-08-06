import { Link } from "react-router-dom";
import { formatPeso } from "@lib/utils";

const ProductCard = ({product, ...otherProps}) => {
  return (
    <>
      <Link to={`/products/${product.id}`} className="flex flex-col px-2 sm:px-4 md:px-6 mb-4">
        <div className="h-48 sm:h-56 md:h-[14rem] w-full bg-white rounded-md flex items-center justify-center">
          <img className="object-cover w-full h-full rounded-md" />
        </div>
        <h2
          className="mt-4 font-secondary line-clamp-2 text-base sm:text-lg font-semibold text-left leading-[1.3rem]"
          style={{ minHeight: "3rem" }}
        >
          {product.product_name}
        </h2>

        <div className="mt-2 flex items-center gap-x-2">
          <h1 className="font-primary">
            {formatPeso(
              product.discountedPrice ? product.discountedPrice : product.product_price
            )}
          </h1>
          {product.discountedPrice && (
            <p className="line-through italic text-xs">
              {formatPeso(product.product_price)}
            </p>
          )}
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