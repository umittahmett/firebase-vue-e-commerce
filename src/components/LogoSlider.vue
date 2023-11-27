<template>
  <!-- Logo Slider -->
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
          slidesPerView: 5,
        },
      }"
      :modules="modules"
      class="mySwiper pb-10 px-4 justify-center items-center flex"
    >
      <swiper-slide v-for="reference in references" :key="reference"
        ><img class="max-w-[300px] object-cover w-full" :src="reference" alt=""
      /></swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      references: [],
    };
  },

  setup() {
    return {
      modules: [FreeMode, Pagination, Autoplay],
    };
  },

  async mounted() {
    const storage = getStorage();
    // Get Product Images
    const imagesRef = ref(storage, `references`);
    try {
      const res = await listAll(imagesRef);
      await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          this.references.push(url);
        })
      );
    } catch (error) {
      switch (error.code) {
        case "storage/object-not-found":
          console.log("File doesn't exist");
          break;
        case "storage/unauthorized":
          console.log("User doesn't have permission to access the object");
          break;
        case "storage/canceled":
          console.log("User canceled the upload");
          break;
        case "storage/unknown":
          console.log("Unknown error occurred, inspect the server response");
          break;
        default:
          console.log(error);
      }
    }
  },
};
</script>
