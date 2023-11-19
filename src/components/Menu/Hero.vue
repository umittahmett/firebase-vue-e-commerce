<template>
  <div class="w-full h-[85vh] overflow-hidden relative text-white">
    <img
      class="object-cover w-full h-full bg-center"
      src="/hero/heroBg.jpg"
      alt=""
    />

    <div
      class="absolute top-0 left-0 w-full sm:pt-28 pt-20 sm:pl-10 pl-4 h-full bg-[rgba(0,0,0,0.3)]"
    >
      <div>
        <h1
          class="text-[55px] leading-[60px] sm:text-7xl font-bold max-w-sm md:max-w-xl"
        >
          Seçkin Bilişim Shop for <br />
          Quality Electronics
        </h1>
        <p class="mt-10 max-w-md text-lg">
          in this site i will share my products with people. and in this site
          will be a admin panel for upload new products
        </p>

        <div class="flex items-center justify-start gap-4 mt-10">
          <Button :buttonType="'white'">İletişim</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../Common/Button.vue";
import "animate.css";

export default {
  data() {
    return {};
  },
  components: { Button },
};
</script>
