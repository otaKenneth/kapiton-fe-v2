import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "../../index.css"; // Core Swiper styles
import "swiper/css"; // Core Swiper styles
import "swiper/css/navigation"; // Optional module styles
import "swiper/css/pagination";
import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPeso } from "../../lib/utils";

const API_BASE_URL = 'http://localhost:9000/api';

const HomePage = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // State to hold fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [homeData, setHomeData] = useState({
    sliderBanners: [],
    fixBanners: [],
    newProducts: [],
    bestSellers: [],
    discountedProducts: [],
    featuredProducts: [],
    categories: [],
    meta: {
      title: 'Kapiton - Philippines',
      description: 'Online Shopping Website which deals in Clothing, Electronics & Appliances Products',
      keywords: 'eshop website, online shopping, kapiton e-commerce',
    }
  });

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/index`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success) {
          setHomeData(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch data');
        }
      } catch (e) {
        console.error("Failed to fetch home data:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        <p className="text-xl mt-4">Loading Kapiton data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col justify-center items-center h-screen">
        <p className="text-xl text-red-500 mb-2">Error: {error}</p>
        <p className="text-gray-600">Please check your network connection or API URL.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  // Create dynamic categories from API data
  const topCategories = homeData.categories.map(category => ({
    title: category.category_name,
    link: `/products/category/${encodeURIComponent(category.category_name)}`,
    id: category.id
  }));

  return (
    <div className="w-full">
      {/* slider */}
      <div className="w-full relative">
        {/* custom Navigation Buttons */}
        <button
          ref={prevRef}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-white text-primaryContrast rounded-full p-3 shadow-lg"
        >
          <ChevronLeft />
        </button>
        <button
          ref={nextRef}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-white text-primaryContrast rounded-full p-3 shadow-lg"
        >
          <ChevronRight />
        </button>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          pagination={{ clickable: true }}
          onInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {homeData.sliderBanners.length > 0 ? (
            homeData.sliderBanners.map((banner, i) => (
              <SwiperSlide key={banner.id || i}>
                <div className="h-[20rem] bg-gradient-to-r from-blue-100 to-blue-300 flex items-center justify-center">
                  {banner.banner_image ? (
                    <img 
                      src={banner.banner_image} 
                      alt={banner.alt || `Banner ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-2xl text-blue-900">Banner {i + 1}</div>
                  )}
                </div>
              </SwiperSlide>
            ))
          ) : (
            // Fallback slides if no banners
            Array.from({ length: 3 }, (_, i) => (
              <SwiperSlide key={i}>
                <div className="h-[20rem] bg-gradient-to-r from-blue-100 to-blue-300 flex items-center justify-center text-2xl text-blue-900">
                  Slider {i + 1}
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>

      {/* OUR TOP CATEGORIES */}
      <div className="w-full bg-primaryContrast px-2 sm:px-4 md:px-8 pt-8 md:pt-14 pb-8 md:pb-10 flex flex-col gap-y-4 md:gap-y-6">
        <h1 className="font-primary text-primary font-semibold text-3xl sm:text-4xl md:text-6xl text-center">
          OUR TOP CATEGORIES
        </h1>
        <div className="w-full max-w-full flex-1 relative min-w-0">
          {/* custom Navigation Buttons */}
          <button
            ref={prevRef}
            className="absolute left-2 top-[40%] z-10 -translate-y-1/2 bg-white text-primaryContrast rounded-full p-3 shadow-lg"
          >
            <ChevronLeft />
          </button>
          <button
            ref={nextRef}
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
            loop={topCategories.length > 3}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            pagination={{ clickable: true }}
            onInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
              window.addEventListener('resize', () => swiper.update());
            }}
          >
            {topCategories.length > 0 ? (
              topCategories.map((tc, i) => (
                <SwiperSlide key={`${tc.id}-${i}`} className="flex w-full min-w-0">
                  <Link
                    to={tc.link}
                    className="w-full h-[6rem] sm:h-[8rem] md:h-[10rem] rounded-2xl px-4 sm:px-6 md:px-8 text-center bg-primary flex items-center justify-center text-lg sm:text-2xl md:text-3xl font-semibold uppercase text-white font-primary"
                  >
                    {tc.title}
                  </Link>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide className="flex w-full min-w-0">
                <div className="w-full h-[6rem] sm:h-[8rem] md:h-[10rem] rounded-2xl px-4 sm:px-6 md:px-8 text-center bg-gray-300 flex items-center justify-center text-lg sm:text-2xl md:text-3xl font-semibold uppercase text-gray-600 font-primary">
                  No Categories Available
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>

      {/* OUR TOP PRODUCTS - Best Sellers */}
      <div className="w-full px-2 sm:px-4 md:px-8 py-8 md:py-14 flex flex-col gap-y-4 md:gap-y-6">
        <h1 className="font-primary text-primary font-semibold text-3xl sm:text-4xl md:text-6xl text-center py-4 md:py-8">
          OUR TOP PRODUCTS
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4">
          {homeData.bestSellers.length > 0 ? (
            homeData.bestSellers.map((product, i) => (
              <div
                key={`${product.id}-${i}`}
                className="flex flex-col items-center px-2 sm:px-4 md:px-8 text-center"
              >
                <div className="sm:h-[12rem] md:h-[14rem] h-[10rem] w-full sm:w-[12rem] md:w-[14rem] bg-white rounded-md mx-auto">
                  {product.product_image ? (
                    <img 
                      src={product.product_image} 
                      alt={product.product_name}
                      className="object-cover w-full h-full rounded-md" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>
                <h2
                  className="mt-2 md:mt-4 font-secondary line-clamp-2 text-base md:text-lg"
                  style={{ minHeight: "2.5rem" }}
                >
                  {product.product_name}
                </h2>
                <h1 className="mt-2 font-primary font-bold text-base md:text-xl">
                  {formatPeso(product.product_discount > 0 ? (product.product_price - product.product_discount) : product.product_price)}
                </h1>
                {product.product_discount > 0 && (
                  <p className="line-through italic text-xs md:text-base">
                    {formatPeso(product.product_price)}
                  </p>
                )}
                <Link
                  to={`/products/${product.id}`} 
                  className="mt-2 border-2 border-primaryContrast rounded-full flex justify-center items-center font-primary px-4 py-2 font-semibold hover:bg-primaryContrast hover:text-white transition-colors text-xs md:text-base"
                >
                  Order Now
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No best sellers available at the moment.
            </div>
          )}
        </div>
      </div>

      {/* RECENTLY ADDED */}
      <div className="w-full px-2 sm:px-4 md:px-8 py-8 md:py-14 flex flex-col gap-y-4 md:gap-y-6">
        <h1 className="font-primary text-primary text-center font-semibold text-3xl sm:text-4xl md:text-6xl py-4 md:py-8">
          RECENTLY ADDED
        </h1>
        <div className="h-[2px] md:h-[3px] w-full bg-primary"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4">
          {homeData.newProducts.length > 0 ? (
            homeData.newProducts.map((product, i) => (
              <Link to={`/products/${product.id}`} key={`${product.id}-${i}`} className="flex flex-col px-2 sm:px-4 md:px-8 mb-4">
                <div className="sm:h-[12rem] md:h-[14rem] h-[10rem] w-full sm:w-[12rem] md:w-[14rem] bg-white rounded-md mx-auto">
                  {product.product_image ? (
                    <img 
                      src={product.product_image} 
                      alt={product.product_name}
                      className="object-cover w-full h-full rounded-md" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>
                <h2
                  className="mt-2 md:mt-4 font-secondary line-clamp-2 text-base md:text-lg font-semibold text-left line-height-[1rem]"
                  style={{ minHeight: "2.5rem" }}
                >
                  {product.product_name}
                </h2>
                <div className="flex w-full justify-between mt-2">
                  <div>
                    <h1 className="font-primary text-sm md:text-base">
                      {formatPeso(product.product_discount > 0 ? (product.product_price - product.product_discount) : product.product_price)}
                    </h1>
                    {product.product_discount > 0 && (
                      <p className="line-through italic text-xs">
                        {formatPeso(product.product_price)}
                      </p>
                    )}
                  </div>
                  <h1 className="text-xs md:text-sm opacity-80">
                    {product.vendor ? product.vendor.name : 'No Reviews'}
                  </h1>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No new products available at the moment.
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="h-[28rem] w-full bg-primary py-10 px-8">
        <div className="w-1/2 py-6 flex flex-col gap-y-2">
          <h1 className="text-6xl font-bold font-primary text-white">Become a merchant</h1>
          <p className="text-xl mt-4 font-semibold font-secondary">Join us in this exciting journey</p>
          <p className="text-sm font-body">Whether you're a student entrepreneur ready to showcase your creations or a local brand looking for a stage to shine, Kapiton invites you to join us in this exciting journey of innovation and community. Explore, connect, and be part of a movement that believes in the power of student-led entrepreneurship.</p>
          <p className="text-sm font-body mt-2">Kapiton – Where Creativity Meets Commerce, and Every Student is an Entrepreneurial Star!</p>

          <a href="/" className="px-4 font-primary font-semibold mt-6 py-2 rounded-full w-fit border-2 border-primaryContrast">LEARN MORE</a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;