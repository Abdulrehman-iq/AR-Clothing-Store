// components/Banner/Banner.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Banner.css';

const Banner = () => {
  const bannerData = [
    {
      id: 1,
      title: "Summer Collection",
      subtitle: "UP TO 50% OFF",
      description: "Discover the latest trends in summer fashion",
      image: "/src/assets/tshirt1.jpg",
      buttonText: "Shop Now",
      link: "/shop"
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "EXCLUSIVE OFFERS",
      description: "Be the first to explore our newest collections",
      image: "/src/assets/tshirt2.jpg",
      buttonText: "Explore",
      link: "/new-arrivals"
    },
    {
      id: 3,
      title: "Limited Edition",
      subtitle: "SPECIAL COLLECTION",
      description: "Premium designs for the fashion-forward",
      image: "/src/assets/shirt3.jpg",
      buttonText: "View Collection",
      link: "/collection"
    }
  ];

  return (
    <div className="relative w-full h-[600px] md:h-[700px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full"
      >
        {bannerData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4 md:px-8">
                  <div className="max-w-xl space-y-6">
                    <span className="inline-block text-interactive-hover font-semibold text-xl md:text-2xl">
                      {slide.subtitle}
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-surface-light">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl text-content-light">
                      {slide.description}
                    </p>
                    <button className="px-8 py-3 bg-interactive-hover text-primary-900 rounded-full
                                     font-medium hover:bg-accent-light transition-all duration-300
                                     transform hover:scale-105">
                      {slide.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;