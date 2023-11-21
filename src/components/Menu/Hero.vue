<template>
  <div class="w-full h-[90vh] overflow-hidden relative text-white">
    <img
      class="object-cover w-full h-full bg-center"
      src="/hero/heroBg.jpg"
      alt=""
    />

    <div
      class="absolute top-0 left-0 w-full sm:pt-24 pt-10 sm:pl-10 pl-4 h-full bg-[rgba(0,0,0,0.3)]"
    >
      <div>
        <h1
          class="text-[55px] leading-[60px] sm:text-7xl font-bold max-w-sm md:max-w-xl"
        >
          Seçkin Bilişim <br />
          Profesyonel <br />
          IT Destek
        </h1>
        <p class="mt-6 max-w-md">
          Seçkin Bilişim Mağazası, güvenilir elektronik ürünleriyle bilgi ve
          kaliteyi bir araya getiriyor. Kaliteli alışverişin adresi!
        </p>

        <div class="flex items-center justify-start gap-4 mt-6">
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
