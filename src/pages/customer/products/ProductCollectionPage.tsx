import { Link, useNavigate, useParams } from "react-router-dom";
import { formatPeso } from "../../../lib/utils";
import { useState } from "react";
import DoubleSlider from "../../../components/customer/DoubleSlider";

const ProductsCollectionPage = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();

  // query based on collection id
  const collectionProducts = [
    {
      image: "",
      name: "ASH | Multipurpose Upcycled Denim Bags",
      price: 769,
      discountedPrice: null,
      reviews: null,
      shopName: "Unbound",
      shopImage: ""
    },
    {
      image: "",
      name: "Daphne Doll Shoes in Coconut",
      price: 1290,
      discountedPrice: null,
      reviews: null,
      shopName: "Unbound",
      shopImage: ""
    },
    {
      image: "",
      name: "Kapiton Polo",
      price: 699,
      discountedPrice: 349.5,
      reviews: 4.5,
      shopName: "Unbound",
      shopImage: ""
    },
    {
      image: "",
      name: "Daphne Doll Shoes in Tiramisu",
      price: 1290,
      discountedPrice: null,
      reviews: 3,
      shopName: "Unbound",
      shopImage: ""
    },
    {
      image: "",
      name: "Holiday Cheer by SPARK",
      price: 549,
      discountedPrice: null,
      reviews: null,
      shopName: "Unbound",
      shopImage: ""
    },
    {
      image: "",
      name: "ASH | Multipurpose Upcycled Denim Bags",
      price: 769,
      discountedPrice: null,
      reviews: null,
      shopName: "Unbound",
      shopImage: ""
    },
    {
      image: "",
      name: "Daphne Doll Shoes in Coconut",
      price: 1290,
      discountedPrice: null,
      reviews: null,
      shopName: "Unbound",
      shopImage: ""
    },
    {
      image: "",
      name: "Kapiton Polo",
      price: 699,
      discountedPrice: 349.5,
      reviews: null,
      shopName: "Unbound",
      shopImage: ""
    },
    {
      image: "",
      name: "Daphne Doll Shoes in Tiramisu",
      price: 1290,
      discountedPrice: null,
      reviews: null,
      shopName: "Unbound",
      shopImage: ""
    },
    {
      image: "",
      name: "Holiday Cheer by SPARK",
      price: 549,
      discountedPrice: null,
      reviews: null,
      shopName: "Unbound",
      shopImage: ""
    },
  ];

  const [filterPriceRange, setFilterPriceRange] = useState<[number, number]>([0, 1000])

  if (!collectionId) {
    navigate("/");
    return;
  }

  return (
    <div className="w-full flex flex-col gap-y-6 px-2 sm:px-4 md:px-8 pt-8 md:mt-0">
      {/* title */}
      <div className="w-full pt-4 sm:pt-8">
        <h1 className="font-primary text-center font-bold text-primary py-8 sm:py-12 md:py-16 text-3xl sm:text-5xl md:text-7xl break-words">
          {collectionId.toUpperCase()}
        </h1>
        <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-end font-body gap-y-2">
          <p className="text-primaryContrast/50">46 PRODUCTS</p>
          <div>
            <p className="text-sm text-primaryContrast/50">Sort By:</p>
            <select
              name="sort"
              id="sort"
              className="px-4 rounded-md py-1 text-sm "
            >
              <option value="date_new_to_old">Date, new to old</option>
              <option value="date_old_to_new">Date, old to new</option>
              <option value="price_low_to_high">Price, low to high</option>
              <option value="price_high_to_low">Price, high to low</option>
              <option value="alphabetically_a_to_z">
                Alphabetically, A to Z
              </option>
              <option value="alphabetically_z_to_a">
                Alphabetically, Z to A
              </option>
              <option value="best_selling">Best Selling</option>
            </select>
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-primary"></div>
      <div className="flex flex-col md:flex-row mt-4 gap-y-8 md:gap-y-0">
        {/* filters */}
        <div className="w-full md:w-1/5 mb-8 md:mb-0 px-2 md:px-0">
            {/* price filter */}
            <div className="font-body">
                <h1 className="font-bold">PRICE</h1>
                {/* should be dynamic with the highest price in collection */}
                <p className="text-sm">{formatPeso(filterPriceRange[0])} - {formatPeso(filterPriceRange[1])}</p>
            </div>
            <DoubleSlider
              min={0}
              max={1000}
              value={filterPriceRange}
              onChange={setFilterPriceRange}
            />
            <div className="w-full flex justify-center mt-4">
                <button className="bg-primary text-white font-secondary rounded-2xl px-8 py-1 font-bold">
                    APPLY FILTERS
                </button>
            </div>
        </div>

        {/* products */}
        <div className="w-full md:w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-6 pb-8">
          {collectionProducts.map((tp, i) => (
            <Link to={`/products/${tp.name}`} key={i} className="flex flex-col px-2 sm:px-4 md:px-6 mb-4">
              <div className="h-48 sm:h-56 md:h-[14rem] w-full bg-white rounded-md flex items-center justify-center">
                <img className="object-cover w-full h-full rounded-md" />
              </div>
              <h2
                className="mt-4 font-secondary line-clamp-2 text-base sm:text-lg font-semibold text-left leading-[1.3rem]"
                style={{ minHeight: "3rem" }}
              >
                {tp.name}
              </h2>

              <div className="mt-2 flex items-center gap-x-2">
                <h1 className="font-primary">
                  {formatPeso(
                    tp.discountedPrice ? tp.discountedPrice : tp.price
                  )}
                </h1>
                {tp.discountedPrice && (
                  <p className="line-through italic text-xs">
                    {formatPeso(tp.price)}
                  </p>
                )}
              </div>

              <div className="flex justify-between w-full items-center mt-4">
                <span className="flex gap-x-2 items-center text-sm">
                    {/* shop image */}
                    <div className="h-7 w-7 rounded-md bg-white"></div>
                    <p>{tp.shopName}</p>
                </span>
                <h1 className="text-xs sm:text-sm opacity-80">{tp.reviews ? `${tp.reviews} Stars` : 'No Reviews'}</h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsCollectionPage;
