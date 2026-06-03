import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import "swiper/css";
import "swiper/css/autoplay";

// Images
import benner1 from "../../assets/images/benner1.jpg";
import benner2 from "../../assets/images/benner2.jpg";
import benner3 from "../../assets/images/benner3.jpg";
import benner4 from "../../assets/images/benner4.jpg";
import benner5 from "../../assets/images/benner5.jpg";
import benner6 from "../../assets/images/benner6.jpg";
import benner7 from "../../assets/images/benner7.jpg";

const Slider = () => {
  const image = [benner1, benner2, benner3, benner4, benner5, benner6, benner7];

  console.log(benner1); // TEST

  return (
    <>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        style={{ height: "550px" }}   // IMPORTANT
      >
        {image.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              src={item}
              alt="banner"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Slider;
