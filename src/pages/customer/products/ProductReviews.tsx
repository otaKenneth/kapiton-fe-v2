import { productReviews } from '@api'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const ProductReviews = () => {
  const { id } = useParams();
  const { data, isFetching, isSuccess, isError, error } = useQuery({
    queryKey: ['productReviews', id],
    queryFn: () => productReviews(id),
    refetchOnWindowFocus: false,
    retry: 1,
    select: (data) => data.data
  });

  return (
    <div className="w-full flex flex-col px-2 sm:px-4 md:px-8 pt-8 product-reviews m-auto">
      <div className="w-auto flex flex-col flex-wrap justify-center align-items-center">
        <div className="product-total-review-container flex flex-shrink-1 flex-wrap gap-4 bg-white">
          <h2 className="w-full text-3xl font-bold text-center">Product Reviews</h2>
          <div className="box-1 w-50 widget-rating">
            <StarRating count={data?.avg_star_rating} />
            <span className="text-sm text-gray-500">{data?.avg_rating} out of 5 stars</span>
            <div className="review-count">
              <span className="text-sm text-gray-500">{data?.total_reviews} reviews</span>
            </div>
          </div>
          <div className="box-2 filters">
            <select className="filter-select">
              <option value="all">All Reviews</option>
              <option value="positive">Positive Reviews</option>
              <option value="negative">Negative Reviews</option>
            </select>
          </div>
        </div>

        <div className="w-full flex flex-wrap justify-around mt-6 gap-y-4">
          {data?.reviews.map((review) => (
            <div key={review.id} className="bg-white review-card p-4 border rounded shadow-sm">
              <div className="flex items-center gap-2">
                <StarRating count={review.rating} />
                <span className="text-sm text-gray-500">{`${review.user.first_name} ${review.user.last_name}`}</span>
              </div>
              <p className="text-gray-700 mt-2">{review.review}</p>
              <span className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    {/* Add review components here */}
    </div>
  );
}

const StarRating = ({count}: number) => {
  return (
    <div className="rating flex justify-center items-center">
      {[...Array(5)].map((_, index) => (
        <div key={index} className={`e-icon-wrapper ${index < count ? "e-icon-marked" : "e-icon"}`}>
          <svg
            aria-hidden="true"
            className="e-font-icon-svg e-eicon-star"
            viewBox="0 0 1000 1000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M450 75L338 312 88 350C46 354 25 417 58 450L238 633 196 896C188 942 238 975 275 954L500 837 725 954C767 975 813 942 804 896L763 633 942 450C975 417 954 358 913 350L663 312 550 75C529 33 471 33 450 75Z"></path>
          </svg>
        </div>
      ))}
    </div>
  )
}

export default ProductReviews;