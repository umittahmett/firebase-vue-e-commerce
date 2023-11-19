<template>
  <div class="w-full px-3">
    <div class="max-w-7xl w-full mx-auto py-10">
      <h2 class="text-xl text-start font-medium">{{ name }}</h2>

      <swiper
        :spaceBetween="10"
        :freeMode="false"
        :pagination="{
          clickable: true,
        }"
        :autoplay="{
          delay: 5000,
        }"
        :breakpoints="{
          0: {
            slidesPerView: 1,
          },
          320: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          900: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide
          v-for="product in products"
          :key="product.name"
          class="mb-10 cursor-grab mt-5 flex justify-center items-center border rounded-md"
        >
          <Product :product="product" :text_align="'center'" />
        </swiper-slide>
      </swiper>
    </div>

    <div v-if="products.length == 0" class="text-center">
      <ProgressSpinner class="w-24 h-24" />
    </div>
  </div>
</template>

<script>
import Sale from "../components/Common/Sale.vue";
import Product from "./Common/Product.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import ProgressSpinner from "primevue/progressspinner";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

export default {
  props: {
    products: {
      type: Array,
      default: [],
    },
    pagination: {
      type: Boolean,
      default: true,
    },
    slidesPerView: {
      type: Number,
      default: 3,
    },
    name: {
      type: Text,
      default: "Lorem",
    },
  },
  components: { Sale, Swiper, SwiperSlide, ProgressSpinner, Product },
  data() {
    return {
      modules: [FreeMode, Pagination, Autoplay],
    };
  },
};
</script>
