<template>
  <div class="max-w-7xl w-full mx-auto py-10 px-2  ">
    <div class="flex justify-between items-center w-full">
      <h2 class="text-xl font-medium">{{ name }}</h2>
      <button
        class="hover:text-blue-500 text-gray-400 transition-colors hover:border-blue-500  font-medium border-b border-gray-300"
      >
       All {{ name }}
      </button>
    </div>

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
          640: {
            slidesPerView: 2,
          },
          900: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }"
        :modules="modules"
        class="mySwiper"
      >

      <swiper-slide v-for="product in products" :key="product.name" class="mb-10 cursor-grab mt-5 " >
       <div class="text-center">
       <div class="relative w-fit mx-auto">
        <img
          class="object-cover bg-center w-[400px] h-[370px] rounded-md"
          :src="'/public/example/img1.webp'"
          alt=""
        />
        <Sale :bgColor="'blue'" v-if="product.discount" />
       </div>
        <div class="px-2">
          <h4 class="font-medium text-xl line-clamp-2 mt-4">
            {{ product.name }}
          </h4>

          <p class="text-gray-500 line-clamp-4 mt-2 font-light">
            {{ product.description }}
          </p>

          <p class="mt-2 text-gray-700 font-light text-xl flex items-center gap-x-1">
           <div class="flex items-center gap-1 justify-center w-full">
            <div v-if="product.discount" class="">
             <p class="text-gray-600 line-through text-base ">{{ product.price }}&#8378;</p> 
            </div>

            {{ product.discount ? product.price - product.price/100 * product.discount :product.price }}&#8378;
           </div>
          </p>
        </div>
       </div>
      </swiper-slide>
      </swiper>
  </div>
</template>
<script>
import Sale from "../components/Common/Sale.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
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
    name:{
      type: Text,
      default: 'Lorem'
    }


  },
  components: { Sale, Swiper, SwiperSlide },
  data() {
    return {
      modules: [FreeMode, Pagination, Autoplay],
    };
  },


};
</script>


