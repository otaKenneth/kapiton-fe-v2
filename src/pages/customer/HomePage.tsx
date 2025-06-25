import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "../../index.css"; // Core Swiper styles
import "swiper/css"; // Core Swiper styles
import "swiper/css/navigation"; // Optional module styles
import "swiper/css/pagination";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPeso } from "../../lib/utils";

const HomePage = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // fetch slider images

  // fetch top categories
  let topCategories = [
    {
      title: "Novelty and Collectibles",
      link: "/products/category/Novelty%20and%20Collectibles",
    },
    {
      title: "Men",
      link: "/products/category/Men",
    },
    {
      title: "Women",
      link: "/products/category/Women",
    },
    {
      title: "Electronics",
      link: "/products/category/Electronics",
    },
    {
      title: "Handicrafts",
      link: "/products/category/Handicrafts",
    },
    {
      title: "Jewelry And Accessories",
      link: "/products/category/Jewelry%20And%20Accessories",
    },
  ];

  // fetch top products
  let topProducts = [
    {
      image: "",
      name: "ASH | Multipurpose Upcycled Denim Bags",
      price: 769,
      discountedPrice: null,
    },
    {
      image: "",
      name: "Daphne Doll Shoes in Coconut",
      price: 1290,
      discountedPrice: null,
    },
    {
      image: "",
      name: "Kapiton Polo",
      price: 699,
      discountedPrice: 349.5,
    },
    {
      image: "",
      name: "Daphne Doll Shoes in Tiramisu",
      price: 1290,
      discountedPrice: null,
    },
    {
      image: "",
      name: "Holiday Cheer by SPARK",
      price: 549,
      discountedPrice: null,
    },
  ];

  // fetch recently added
  let recentlyAddedProducts = [
    {
      image: "",
      name: "ASH | Multipurpose Upcycled Denim Bags",
      price: 769,
      discountedPrice: null,
      reviews: null
    },
    {
      image: "",
      name: "Daphne Doll Shoes in Coconut",
      price: 1290,
      discountedPrice: null,
      reviews: null
    },
    {
      image: "",
      name: "Kapiton Polo",
      price: 699,
      discountedPrice: 349.5,
      reviews: 4.5,
    },
    {
      image: "",
      name: "Daphne Doll Shoes in Tiramisu",
      price: 1290,
      discountedPrice: null,
      reviews: 3,
    },
    {
      image: "",
      name: "Holiday Cheer by SPARK",
      price: 549,
      discountedPrice: null,
      reviews: null
    },
    {
      image: "",
      name: "ASH | Multipurpose Upcycled Denim Bags",
      price: 769,
      discountedPrice: null,
      reviews: null
    },
    {
      image: "",
      name: "Daphne Doll Shoes in Coconut",
      price: 1290,
      discountedPrice: null,
      reviews: null
    },
    {
      image: "",
      name: "Kapiton Polo",
      price: 699,
      discountedPrice: 349.5,
      reviews: null
    },
    {
      image: "",
      name: "Daphne Doll Shoes in Tiramisu",
      price: 1290,
      discountedPrice: null,
      reviews: null
    },
    {
      image: "",
      name: "Holiday Cheer by SPARK",
      price: 549,
      discountedPrice: null,
      reviews: null
    },
  ];

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
          {new Array(5).fill(null).map((_, i) => (
            <React.Fragment key={i}>
              <SwiperSlide>
                <div className="h-[20rem] bg-gradient-to-r from-blue-100 to-blue-300 flex items-center justify-center text-2xl text-blue-900">
                  image {i + 1}
                </div>
              </SwiperSlide>
            </React.Fragment>
          ))}
        </Swiper>
      </div>

      {/* OUR TOP CATEGORIES */}
      <div className="w-full bg-primaryContrast px-8 pt-14 py-10 flex flex-col gap-y-6">
        <h1 className="font-primary text-primary font-semibold text-6xl text-center">
          OUR TOP CATEGORIES
        </h1>
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
            className="top-categories-swiper"
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={3}
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
            {topCategories.map((tc, i) => (
              <React.Fragment key={i}>
                <SwiperSlide>
                  <Link
                    to={tc.link}
                    className="h-[10rem] rounded-2xl px-8 text-center bg-primary flex items-center justify-center text-3xl font-semibold uppercase text-white font-primary"
                  >
                    {tc.title}
                  </Link>
                </SwiperSlide>
              </React.Fragment>
            ))}
          </Swiper>
        </div>
      </div>

      {/* OUR TOP PRODUCTS */}
      <div className="w-full px-8 py-14 flex flex-col gap-y-6">
        <h1 className="font-primary text-primary font-semibold text-6xl text-center py-8">
          OUR TOP CATEGORIES
        </h1>
        <div className="grid grid-cols-5">
          {topProducts.map((tp, i) => (
            <div
              key={i}
              className="flex flex-col items-center px-8 text-center"
            >
              <div className="h-[14rem] w-[14rem] bg-white rounded-md">
                <img className="object-cover" />
              </div>
              <h2
                className="mt-4 font-secondary line-clamp-2"
                style={{ minHeight: "3rem" }}
              >
                {tp.name}
              </h2>
              <h1 className="mt-2 font-primary font-bold text-xl">
                {formatPeso(tp.discountedPrice ? tp.discountedPrice : tp.price)}
              </h1>
              {tp.discountedPrice && (
                <p className="line-through italic">{formatPeso(tp.price)}</p>
              )}
              <button className="mt-2 border-2 border-primaryContrast rounded-full flex justify-center items-center font-primary px-4 py-2 font-semibold hover:bg-primaryContrast hover:text-white transition-colors">
                Order Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* RECENTLY ADDED */}
      <div className="w-full px-8 py-14 flex flex-col gap-y-6">
        <h1 className="font-primary text-primary text-center font-semibold text-6xl py-8">
          RECENTLY ADDED
        </h1>
        <div className="h-[3px] w-full bg-primary">

        </div>
        <div className="grid grid-cols-5 gap-y-4">
          {recentlyAddedProducts.map((tp, i) => (
            <div key={i} className="flex flex-col px-8 mb-4">
              <div className="h-[14rem] w-[14rem] bg-white rounded-md">
                <img className="object-cover" />
              </div>
              <h2
                className="mt-4 font-secondary line-clamp-2 text-lg font-semibold text-left line-height-[1rem]"
                style={{ minHeight: "3rem" }}
              >
                {tp.name}
              </h2>
              <div className="flex w-full justify-between mt-2">
                <div>
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
                <h1 className="text-sm opacity-80">{tp.reviews ? `${tp.reviews} Stars` : 'No Reviews'}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
