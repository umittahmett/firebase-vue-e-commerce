<template>
  <div class="max-w-7xl w-full mx-auto py-10">
    <h2 class="text-blue-500 text-center font-bold text-4xl mb-10">
      Referanslar
    </h2>

    <swiper
      :spaceBetween="30"
      :autoplay="{
        delay: 1000,
      }"
      :breakpoints="{
        0: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 3,
        },

        1024: {
          slidesPerView: 4,
        },
      }"
      :modules="modules"
      class="mySwiper pb-10 px-4 justify-center flex"
    >
      <swiper-slide
        ><img
          class="sm:h-[200px] md:h-[230px] object-cover w-full"
          src="/Logos/wossew.jpeg"
          alt=""
      /></swiper-slide>
      <swiper-slide
        ><img
          class="sm:h-[200px] md:h-[230px] object-cover w-full"
          src="/Logos/brninsaat.jpeg"
          alt=""
      /></swiper-slide>
      <swiper-slide
        ><img
          class="sm:h-[200px] md:h-[230px] object-cover w-full"
          src="/Logos/mobilyasitesi.jpeg"
          alt=""
      /></swiper-slide>
    </swiper>
  </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination, Autoplay } from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [FreeMode, Pagination, Autoplay],
    };
  },
};
</script>
