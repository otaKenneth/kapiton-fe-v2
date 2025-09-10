import * as React from "react";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useMessageDialog } from '@components';
import { productsQuery, addProductToCart } from "@api";
import ProductFilters from './ProductFilters';
import ProductCard from './ProductCard';
import { useAppContext } from "@context/AppContext";

type AddToCartPayload = { product_id: any; product_name: any; quantity: number; guest_token: string };

type Product = {
  id: string | number;
  product_name: string;
};

const ProductsCollectionPage = () => {
  const { collectType, collectionId } = useParams();
  const navigate = useNavigate();
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);
  const { showMessage } = useMessageDialog()
  const { state, setState } = useAppContext();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", collectionId],
    queryFn: ({ pageParam = 1 }) => productsQuery(collectType, collectionId, pageParam),
    getNextPageParam: (lastPage) => {
      // Assuming your API returns pagination info like { current_page, last_page }
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1;
      }
      return undefined; // no more pages
    },
    initialPageParam: 1,
    initialData: {
      pages: [
        {
          data: []
        }
      ],
      pageParams: [],
      total: 0
    }
  });

  const addtocartMutation = useMutation({
    mutationFn: (product : AddToCartPayload) => addProductToCart(state.token, product),
    onSuccess: (resp) => {
      console.log("Added to cart:", resp);
      if (resp.success) {
        setState(prev => ({
          ...prev,
          cart: resp.data
        }))
        showMessage({
          open: true,
          message: resp.message,
          type: "success",
          title: "Success!"
        })
      }
    },
    onError: (error) => {
      showMessage({
        open: true,
        message: error.message,
        type: "error",
        title: "Error!"
      })
    }
  });

  const products = data?.pages.flatMap((page) => page.data) ?? [];

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 } // Trigger when fully visible
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleQuickAdd = (product: Product) => {
    // console.log(product)
    addtocartMutation.mutate({
      guest_token: state.guest_token,
      quantity: 1,
      product_id: product.id,
      product_name: product.product_name,
    });
  }

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
          <p className="text-primaryContrast/50">{data.total} PRODUCTS</p>
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
        <ProductFilters />

        <div>
          {/* products */}
          {products.length === 0 && !isFetchingNextPage ? (
            <div className="w-full text-center py-20">
              <p className="font-body text-xl">No Results Found...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} 
                  onQuickAdd={handleQuickAdd}
                />
              ))}
            </div>
          )}

          {/* Loader */}
          {isFetchingNextPage && (
            <div className="w-full text-center py-20">
              <p className="font-body text-xl">Loading...</p>
            </div>
          )}
          
          <div id="product-collection-hit-scroll" ref={sentinelRef} className="h-4"></div>
        </div>

      </div>
    </div>
  );
};

export default ProductsCollectionPage;
