<template>
  <div class="max-w-7xl w-full mx-auto py-10">
    <swiper
      :spaceBetween="30"
      :autoplay="{
        delay: 1000,
      }"
      :breakpoints="{
        0: {
          slidesPerView: 3,
        },
        640: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 6,
        },
      }"
      :modules="modules"
      class="mySwiper pb-10 px-4"
    >
      <swiper-slide><img src="/Logos/google.png" alt="" /></swiper-slide>
      <swiper-slide><img src="/Logos/google.png" alt="" /></swiper-slide>
      <swiper-slide><img src="/Logos/google.png" alt="" /></swiper-slide>
      <swiper-slide><img src="/Logos/google.png" alt="" /></swiper-slide>
      <swiper-slide><img src="/Logos/google.png" alt="" /></swiper-slide>
      <swiper-slide><img src="/Logos/google.png" alt="" /></swiper-slide>
      <swiper-slide><img src="/Logos/google.png" alt="" /></swiper-slide>
      <swiper-slide><img src="/Logos/google.png" alt="" /></swiper-slide>
      <swiper-slide><img src="/Logos/google.png" alt="" /></swiper-slide>
      <swiper-slide><img src="/Logos/google.png" alt="" /></swiper-slide>
      <swiper-slide><img src="/Logos/google.png" alt="" /></swiper-slide>
      <swiper-slide><img src="/Logos/google.png" alt="" /></swiper-slide>
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
