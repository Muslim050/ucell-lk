import { CarouselItemInterface } from "src/core/models/mainscreen.interface";
import React from "react";
// import { Splide, SplideSlide } from '@splidejs/react-splide';
// import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
interface SharesBannerProps {
  image?: CarouselItemInterface[];
}

// Карта Рекомендаций
const SharesBanner: React.FC<SharesBannerProps> = ({ image }) => {
  return (
    <>
      <div
        style={{
          fontWeight: "600",
          fontSize: "20px",
          lineHeight: "24px",
          marginBottom: "10px",
        }}
      >
        Рекомендуем
      </div>
      <Swiper
        direction={"vertical"}
        slidesPerView={"auto"}
        pagination={{
          clickable: true,
        }}
        style={{ height: "600px", padding: "0px" }}
        modules={[Pagination]}
        className="bannerSwipper"
      >
        {image &&
          image.map((carousel, index) => (
            <SwiperSlide key={index}>
              <Link to={carousel.url} target="_blank" style={{ width: "100%" }}>
                <div
                  key={index}
                  style={{ marginBottom: "20px", height: "300px" }}
                >
                  <div>
                    <img
                      style={{
                        width: "100%",
                        objectFit: "cover",
                        minHeight: "100%",
                        maxWidth: "100%",

                        height: "260px",
                        borderRadius: "12px",
                      }}
                      src={carousel.image_url}
                      alt=""
                    />
                  </div>
                  <div>{carousel.title}</div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default SharesBanner;
