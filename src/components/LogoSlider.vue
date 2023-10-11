<template>
  <swiper
    :slidesPerView="2"
    :spaceBetween="30"
    :autoplay="true"
    :pagination="{
      clickable: true,
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
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [FreeMode, Pagination],
    };
  },
};
</script>
