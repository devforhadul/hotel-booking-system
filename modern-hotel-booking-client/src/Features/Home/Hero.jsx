import React from "react";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/autoplay'
import sliderImg1 from "../../assets/Images/hotel_bookig_img1.jpg";
import sliderImg2 from "../../assets/Images/hotel_bookig_img2.jpg";
import sliderImg3 from "../../assets/Images/hotel_bookig_img3.jpg";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div>
      <Swiper
        modules={[Pagination]}
        className="mySwiper"
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 2500, // 2.5 seconds per slide
          disableOnInteraction: false, // auto slide continues after manual swipe
        }}
        spaceBetween={30}
        slidesPerView={1}
      >
        <SwiperSlide>
          <img
            src={sliderImg1}
            alt="Hotel Room"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-4xl font-bold mb-4">Welcome to Our Hotel</h2>
            <p className="text-lg mb-6 max-w-xl">
              Experience luxury, comfort, and convenience in one place.
            </p>
            <Link to={"/rooms"}>
              <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition">
                Book Now
              </button>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={sliderImg2}
            alt="Hotel Room"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-4xl font-bold mb-4">Welcome to Our Hotel</h2>
            <p className="text-lg mb-6 max-w-xl">
              Experience luxury, comfort, and convenience in one place.
            </p>
            <Link to={"/rooms"}>
              <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition">
                Book Now
              </button>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={sliderImg3}
            alt="Hotel Room"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-4xl font-bold mb-4">Welcome to Our Hotel</h2>
            <p className="text-lg mb-6 max-w-xl">
              Experience luxury, comfort, and convenience in one place.
            </p>
            <Link to={"/rooms"}>
              <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition">
                Book Now
              </button>
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;
