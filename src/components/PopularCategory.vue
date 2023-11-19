<template>
  <div
    class="max-w-7xl w-full py-10 mx-auto px-3 flex justify-center flex-col md:flex-row items-center gap-10"
  >
    <div
      class="w-full relative max-w-md md:max-w-full rounded-md overflow-hidden"
    >
      <img
        class="w-full h-[400px] md:h-[560px] object-cover bg-center"
        src="/example/pc2_category.jpg"
        alt=""
      />

      <a
        href="/search"
        @click="store && store.addSearchedCategory(0)"
        class="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(58,62,78,0.4)] transition-all"
      >
        <Button class="text-xl" :buttonType="'white'">Biligisayar</Button>
      </a>
    </div>

    <div
      class="w-full relative max-w-md md:max-w-full rounded-md overflow-hidden"
    >
      <img
        class="w-full h-[400px] md:h-[560px] object-cover bg-center"
        src="/example/laptop_category.jpg"
        alt=""
      />

      <a
        href="/search"
        @click="store && store.addSearchedCategory(1)"
        class="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(58,62,78,0.4)] transition-all"
      >
        <Button class="text-xl" :buttonType="'white'">Laptop</Button>
      </a>
    </div>
  </div>
</template>
<script>
import Sale from "../components/Common/Sale.vue";
import { createWizardStore } from "../stores/counter";
import Button from "./Common/Button.vue";

export default {
  components: { Sale, Button },
  data() {
    return {
      products: null,
      store: null,
    };
  },

  mounted() {
    this.store = createWizardStore();
  },
};
</script>
