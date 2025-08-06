import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { productDetails } from "@api";
import { Container } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

const ProductsDetailPage = () => {
  const { id } = useParams();

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: () => productDetails(id),
    refetchOnWindowFocus: false,
    retry: 1,
    select: (data) => data.data,
  });

  if (isFetching) {
    return <div className="p-4 sm:p-6 md:p-8">Loading...</div>;
  }

  return (
    <Container className="p-4 sm:p-6 md:p-8">
      <Swiper>
        {data?.images?.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Product Image ${index + 1}`} className="w-full h-auto object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default ProductsDetailPage;
