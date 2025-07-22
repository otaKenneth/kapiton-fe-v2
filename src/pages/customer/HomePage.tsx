import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "../../index.css"; // Core Swiper styles
import "swiper/css"; // Core Swiper styles
import "swiper/css/navigation"; // Optional module styles
import "swiper/css/pagination";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPeso } from "../../lib/utils";
import { useQuery } from "@tanstack/react-query";

// Define an interface for the expected data structure from the backend
// This helps with type safety in TypeScript, if you're using it.
interface HomePageData {
  sliderBanners: {
    image: string | null;
    link: string;
    title: string;
  }[];
  topCategories: {
    title: string;
    link: string;
  }[];
  topProducts: {
    id: number;
    name: string;
    image: string | null;
    price: number;
    discountedPrice: number | null;
    reviews: number | null;
  }[];
  recentlyAddedProducts: {
    id: number;
    name: string;
    image: string | null;
    price: number;
    discountedPrice: number | null;
    reviews: number | null;
  }[];
}

const HomePage = () => {
  // We need distinct refs for each Swiper if they operate independently
  const mainSliderPrevRef = useRef(null);
  const mainSliderNextRef = useRef(null);
  const categoriesSliderPrevRef = useRef(null);
  const categoriesSliderNextRef = useRef(null);


  // Fetch all home page data using useQuery
  const {
    data: homePageData,
    isLoading,
    isError,
    error,
  } = useQuery<HomePageData, Error>({
    queryKey: ["homePageData"],
    queryFn: async () => {
      // **THIS IS THE CRUCIAL PART:** Fetching from your Laravel backend endpoint
      // Ensure 'http://localhost:9000' matches where your Laravel app is running
      // and '/api/index' matches your Laravel route definition.
      const response = await fetch("http://localhost:9000/api/index"); // <--- This line fetches the data

      if (!response.ok) {
        // Handle HTTP errors (e.g., 404, 500)
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonResponse = await response.json();

      // Your backend returns { success: true, message: ..., data: { ... } }
      // So, we check 'success' and return 'data' if successful.
      if (!jsonResponse.success) {
        throw new Error(jsonResponse.message || "Failed to fetch data from API");
      }

      return jsonResponse.data; // This 'data' key contains sliderBanners, topCategories, etc.
    },
    // Optional: Add cache settings if desired
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Data remains in cache for 10 minutes
  });

  // Destructure the fetched data once it's available.
  // Provide empty arrays as fallbacks for initial loading state.
  const sliderBanners = homePageData?.sliderBanners || [];
  const topCategories = homePageData?.topCategories || [];
  const topProducts = homePageData?.topProducts || [];
  const recentlyAddedProducts = homePageData?.recentlyAddedProducts || [];

  // --- Loading and Error States for the entire page ---
  if (isLoading) {
    return (
      <div className="w-full text-center py-20">
        <p className="font-body text-xl">Loading home page content...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full text-center py-20 text-red-600">
        <span className="font-body text-xl flex items-center justify-center gap-x-2">
          <TriangleAlert /> Error loading page data: {error?.message || "Unknown error."}
        </span>
        <p className="font-body text-sm mt-2">Please ensure your Laravel backend is running and accessible at `http://localhost:9000/api/index`.</p>
        <p className="font-body text-sm mt-1">Also check browser console for CORS errors.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* SLIDER BANNERS */}
      <div className="w-full relative">
        {/* custom Navigation Buttons for main slider */}
        <button
          ref={mainSliderPrevRef}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-white text-primaryContrast rounded-full p-3 shadow-lg"
        >
          <ChevronLeft />
        </button>
        <button
          ref={mainSliderNextRef}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-white text-primaryContrast rounded-full p-3 shadow-lg"
        >
          <ChevronRight />
        </button>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          navigation={{ prevEl: mainSliderPrevRef.current, nextEl: mainSliderNextRef.current }}
          pagination={{ clickable: true }}
          onInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = mainSliderPrevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = mainSliderNextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {sliderBanners.length > 0 ? (
            sliderBanners.map((banner, i) => (
              <SwiperSlide key={`slider-${i}`}>
                {banner.link ? (
                  <Link to={banner.link}>
                    <img
                      src={banner.image || "/path/to/placeholder-banner.jpg"} // Fallback placeholder
                      alt={banner.title || `Banner ${i + 1}`}
                      className="w-full h-[20rem] object-cover"
                    />
                  </Link>
                ) : (
                  <img
                    src={banner.image || "/path/to/placeholder-banner.jpg"}
                    alt={banner.title || `Banner ${i + 1}`}
                    className="w-full h-[20rem] object-cover"
                  />
                )}
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="h-[20rem] bg-gradient-to-r from-gray-100 to-gray-300 flex items-center justify-center text-2xl text-gray-900">
                No Banners Available
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      {/* OUR TOP CATEGORIES */}
      <div className="w-full bg-primaryContrast px-2 sm:px-4 md:px-8 pt-8 md:pt-14 pb-8 md:pb-10 flex flex-col gap-y-4 md:gap-y-6">
        <h1 className="font-primary text-primary font-semibold text-3xl sm:text-4xl md:text-6xl text-center">
          OUR TOP CATEGORIES
        </h1>
        <div className="w-full max-w-full flex-1 relative min-w-0">
          {/* custom Navigation Buttons for categories slider */}
          <button
            ref={categoriesSliderPrevRef}
            className="absolute left-2 top-[40%] z-10 -translate-y-1/2 bg-white text-primaryContrast rounded-full p-3 shadow-lg"
          >
            <ChevronLeft />
          </button>
          <button
            ref={categoriesSliderNextRef}
            className="absolute right-2 top-[40%] z-10 -translate-y-1/2 bg-white text-primaryContrast rounded-full p-3 shadow-lg"
          >
            <ChevronRight />
          </button>
          <Swiper
            className="top-categories-swiper w-full min-w-0"
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              768: { slidesPerView: 3, spaceBetween: 32 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
              1280: { slidesPerView: 3, spaceBetween: 32 },
            }}
            loop={true}
            navigation={{ prevEl: categoriesSliderPrevRef.current, nextEl: categoriesSliderNextRef.current }}
            pagination={{ clickable: true }}
            onInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = categoriesSliderPrevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = categoriesSliderNextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
              window.addEventListener("resize", () => swiper.update());
            }}
          >
            {topCategories.length > 0 ? (
              topCategories.map((tc, i) => (
                <SwiperSlide key={`${tc.title}-${i}`} className="flex w-full min-w-0">
                  <Link
                    to={tc.link}
                    className="w-full h-[6rem] sm:h-[8rem] md:h-[10rem] rounded-2xl px-4 sm:px-6 md:px-8 text-center bg-primary flex items-center justify-center text-lg sm:text-2xl md:text-3xl font-semibold uppercase text-white font-primary"
                  >
                    {tc.title}
                  </Link>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="w-full h-[6rem] sm:h-[8rem] md:h-[10rem] rounded-2xl px-4 sm:px-6 md:px-8 text-center bg-gray-300 flex items-center justify-center text-lg sm:text-2xl md:text-3xl font-semibold uppercase text-gray-700 font-primary">
                  No Categories Available
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>

      {/* OUR TOP PRODUCTS */}
      <div className="w-full px-2 sm:px-4 md:px-8 py-8 md:py-14 flex flex-col gap-y-4 md:gap-y-6">
        <h1 className="font-primary text-primary font-semibold text-3xl sm:text-4xl md:text-6xl text-center py-4 md:py-8">
          OUR TOP PRODUCTS
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4">
          {topProducts.length > 0 ? (
            topProducts.map((tp) => (
              <Link
                to={`/products/${tp.id}`} // Using product ID for robust linking
                key={`top-product-${tp.id}`}
                className="flex flex-col items-center px-2 sm:px-4 md:px-8 text-center group"
              >
                <div className="sm:h-[12rem] md:h-[14rem] h-[10rem] w-full sm:w-[12rem] md:w-[14rem] bg-white rounded-md mx-auto overflow-hidden">
                  <img
                    src={tp.image || "/path/to/placeholder-product.jpg"}
                    alt={tp.name}
                    className="object-cover w-full h-full rounded-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h2
                  className="mt-2 md:mt-4 font-secondary line-clamp-2 text-base md:text-lg group-hover:text-primary transition-colors"
                  style={{ minHeight: "2.5rem" }}
                >
                  {tp.name}
                </h2>
                <h1 className="mt-2 font-primary font-bold text-base md:text-xl">
                  {formatPeso(tp.discountedPrice ? tp.discountedPrice : tp.price)}
                </h1>
                {tp.discountedPrice && (
                  <p className="line-through italic text-xs md:text-base text-gray-500">
                    {formatPeso(tp.price)}
                  </p>
                )}
                <div
                  className="mt-2 border-2 border-primaryContrast rounded-full flex justify-center items-center font-primary px-4 py-2 font-semibold hover:bg-primaryContrast hover:text-white transition-colors text-xs md:text-base w-fit"
                >
                  Order Now
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">No top products available.</div>
          )}
        </div>
      </div>

      {/* RECENTLY ADDED */}
      <div className="w-full px-2 sm:px-4 md:px-8 py-8 md:py-14 flex flex-col gap-y-4 md:gap-y-6">
        <h1 className="font-primary text-primary text-center font-semibold text-3xl sm:text-4xl md:text-6xl py-4 md:py-8">
          RECENTLY ADDED
        </h1>
        <div className="h-[2px] md:h-[3px] w-full bg-primary"></div>
        {/* These loading/error states are now handled by the main 'isLoading' and 'isError' */}
        {/* but kept here as an example if you had separate queries for each section */}
        {isLoading && (
            <p className="font-body">Loading recently added products...</p>
        )}
        {isError && (
            <span className="text-red-400 font-body flex gap-x-2"><TriangleAlert />Error loading recently added products</span>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4">
          {recentlyAddedProducts.length > 0 ? (
            recentlyAddedProducts.map((tp) => (
              <Link
                to={`/products/${tp.id}`} // Using product ID for robust linking
                key={`recently-added-${tp.id}`}
                className="flex flex-col px-2 sm:px-4 md:px-8 mb-4 group"
              >
                <div className="sm:h-[12rem] md:h-[14rem] h-[10rem] w-full sm:w-[12rem] md:w-[14rem] bg-white rounded-md mx-auto overflow-hidden">
                  <img
                    src={tp.image || "/path/to/placeholder-product.jpg"}
                    alt={tp.name}
                    className="object-cover w-full h-full rounded-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h2
                  className="mt-2 md:mt-4 font-secondary line-clamp-2 text-base md:text-lg font-semibold text-left line-height-[1rem] group-hover:text-primary transition-colors"
                  style={{ minHeight: "2.5rem" }}
                >
                  {tp.name}
                </h2>
                <div className="flex w-full justify-between mt-2">
                  <div>
                    <h1 className="font-primary text-sm md:text-base">
                      {formatPeso(
                        tp.discountedPrice ? tp.discountedPrice : tp.price
                      )}
                    </h1>
                    {tp.discountedPrice && (
                      <p className="line-through italic text-xs text-gray-500">
                        {formatPeso(tp.price)}
                      </p>
                    )}
                  </div>
                  <h1 className="text-xs md:text-sm opacity-80">
                    {tp.reviews !== null && tp.reviews !== undefined
                      ? `${tp.reviews} Stars`
                      : "No Reviews"}
                  </h1>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">No recently added products available.</div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="h-[28rem] w-full bg-primary py-10 px-8">
        <div className="w-1/2 py-6 flex flex-col gap-y-2">
          <h1 className="text-6xl font-bold font-primary text-white">
            Become a merchant
          </h1>
          <p className="text-xl mt-4 font-semibold font-secondary">
            Join us in this exciting journey
          </p>
          <p className="text-sm font-body">
            Whether you're a student entrepreneur ready to showcase your
            creations or a local brand looking for a stage to shine, Kapiton
            invites you to join us in this exciting journey of innovation and
            community. Explore, connect, and be part of a movement that believes
            in the power of student-led entrepreneurship.
          </p>
          <p className="text-sm font-body mt-2">
            Kapiton – Where Creativity Meets Commerce, and Every Student is an
            Entrepreneurial Star!
          </p>

          <Link
            to="/register-vendor" // Changed href to Link for React Router
            className="px-4 font-primary font-semibold mt-6 py-2 rounded-full w-fit border-2 border-primaryContrast"
          >
            LEARN MORE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;