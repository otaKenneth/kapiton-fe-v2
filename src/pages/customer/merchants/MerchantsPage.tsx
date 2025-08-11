import { Link, useMatch, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { TriangleAlert } from 'lucide-react';

// Define interfaces to match your backend JSON response structure
interface VendorBusinessDetails {
  shop_name: string;
  shop_mobile: string | null;
  shop_email: string | null;
  shop_address: string | null;
  shop_city: string | null;
  shop_state: string | null;
  shop_country: string | null;
  shop_pincode: string | null;
  shop_website: string | null;
  license_image: string | null;
  business_proof_image: string | null;
}

interface VendorData {
  id: number;
  name: string;
  email: string;
  mobile: string;
  wdyfu: string;
  status: number;
  confirm: string;
  business_details: VendorBusinessDetails | null;
  total_products_sold: number;
  profile_image: string | null;
}

interface VendorApiResponse {
  success: boolean;
  message: string;
  data: VendorData[]; // Array of VendorData objects
  meta: {
    currentPage: number;
    perPage: number;
    total: number;
    hasMore: boolean;
    nextPage: number | null;
  };
}

const MerchantsPage = () => {
  const isIndex = useMatch('/merchants');

  // Use useQuery to fetch the list of vendors
  const {
    data: vendorsData,
    isLoading,
    isError,
    error,
  } = useQuery<VendorApiResponse, Error>({
    queryKey: ['merchantsList'],
    queryFn: async () => {

      const response = await fetch('http://localhost:9000/api/vendors');

      if (!response.ok) {
        // Attempt to parse error message from backend if available
        const errorBody = await response.json().catch(() => ({ message: 'Unknown network error' }));
        throw new Error(errorBody.message || `HTTP error! status: ${response.status}`);
      }

      const jsonResponse = await response.json();

      if (!jsonResponse.success) {
        // If backend explicitly indicates failure with success: false
        throw new Error(jsonResponse.message || 'Failed to fetch vendors data from API');
      }

      return jsonResponse;
    },
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="w-full text-center py-20 bg-primaryBackground">
        <p className="font-body text-xl">Loading merchants...</p>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="w-full text-center py-20 text-red-600 bg-primaryBackground">
        <span className="font-body text-xl flex items-center justify-center gap-x-2">
          <TriangleAlert /> Error loading merchants: {error?.message || 'Unknown error.'}
        </span>
        <p className="font-body text-sm mt-2">
          Please ensure your Laravel backend is running and accessible at `http://localhost:9000/api/v2/vendors`.
        </p>
        <p className="font-body text-sm mt-1">
          Also check your browser console for CORS errors.
        </p>
      </div>
    );
  }

  // Extract the actual vendor data array
  const merchants = vendorsData?.data || [];

  return (
    <div className='bg-primaryBackground px-2 pt-8 md:pt-0 sm:px-4 md:px-6'>
      <h1 className="font-primary text-center font-bold text-primary py-8 sm:py-12 md:py-16 text-3xl sm:text-5xl md:text-6xl">
        MERCHANTS
      </h1>
      {isIndex && (
        <div className='px-6 md:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 sm:gap-x-4 gap-y-6 py-4 sm:py-8'>
          {merchants.length > 0 ? (
            merchants.map((m) => (
              <div key={m.id} className='bg-white py-6 sm:py-8 rounded-2xl flex flex-col items-center min-h-[22rem] sm:min-h-[26rem] md:min-h-[30rem] px-2 sm:px-4 shadow-md hover:shadow-lg transition-shadow duration-300'>
                <div className='h-24 w-24 sm:h-32 sm:w-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center'>
                  <img
                    src={m.profile_image || "https://placehold.co/128x128/e0e0e0/ffffff?text=No+Photo"} // Use profile_image from backend
                    alt={m.business_details?.shop_name || m.name}
                    className="object-cover w-full h-full"
                    onError={(e) => { e.currentTarget.src = "https://placehold.co/128x128/e0e0e0/ffffff?text=No+Photo"; }} // Fallback on error
                  />
                </div>
                <div className='mt-4 text-center px-2 sm:px-4'>
                  <h1 className='font-primary font-bold text-base sm:text-lg line-clamp-1'>{m.business_details?.shop_name || m.name}</h1>
                  <p className='font-body text-xs sm:text-sm mt-2 line-clamp-1'>{m.name}</p> {/* Owner name */}
                  <p className='font-body text-xs sm:text-sm line-clamp-2'>
                    {m.business_details?.shop_address || 'Address not specified'}
                    {m.business_details?.shop_city ? `, ${m.business_details.shop_city}` : ''}
                    {m.business_details?.shop_state ? `, ${m.business_details.shop_state}` : ''}
                  </p>
                </div>
                <div className='mt-6 flex flex-col items-center gap-y-4'>
                  {/* Reviews are not provided by backend, so keep as static text or remove */}
                  <p className='font-body font-semibold text-xs sm:text-sm'>
                    {m.reviews ? `${m.reviews} Stars` : 'No Reviews'}
                  </p>
                  <Link to={`/products/vendor/${m.id}`} className='bg-primaryContrast text-white rounded-full px-6 sm:px-8 py-2 text-xs sm:text-base hover:bg-primary hover:scale-105 transition-all duration-300'>
                    View Store
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">No merchants available at the moment.</div>
          )}
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default MerchantsPage;