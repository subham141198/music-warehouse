import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Comments = () => {
  return (
    <div>
      <div className="swiperBg">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <div className="slider">
            <SwiperSlide>
              <p>
                I am most grateful that my son's guitar teacher not only makes
                learning fun and shares his knowledge, but his passion for music
                as well. I could not have found a better place for him to learn
                guitar.
              </p>
            </SwiperSlide>
            <SwiperSlide>
<p>
The school has everything that children need for successful study: textbooks, daily assignments, planner, notebooks, music sheets, a staff who are very nice and kind, and ready to help at any time.
</p>
            </SwiperSlide>
            <SwiperSlide>
<p>
My son has been taking piano and guitar lessons for more than a year. He loves his teachers and I can tell that they really care about my kid too. Your music school is wonderful and I highly recommend.
</p>
            </SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Comments;
