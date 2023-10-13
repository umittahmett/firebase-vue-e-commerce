<template>
  <div
    class="max-w-7xl w-full mx-auto my-20 px-2 flex justify-center items-center gap-10"
  >
    <div class="w-full relative">
      <img
        class="w-full h-[560px] object-cover bg-center"
        src="/example/pc.png"
        alt=""
      />

      <div
        class="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(58,62,78,0.4)] transition-all"
      >
        <Button class="text-xl" :buttonType="'bordered'">Computer</Button>
      </div>
    </div>

    <div class="w-full relative">
      <img
        class="w-full h-[560px] object-cover bg-center"
        src="/example/pc.png"
        alt=""
      />

      <div
        class="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-[rgba(0,0,0,0.3)] hover:bg-[rgba(58,62,78,0.4)] transition-all"
      >
        <Button class="text-xl" :buttonType="'bordered'">Phone</Button>
      </div>
    </div>
  </div>
</template>
<script>
import Sale from "../components/Common/Sale.vue";
import Button from "./Common/Button.vue";

export default {
  components: { Sale, Button },
  data() {
    return {
      products: null,
    };
  },

  mounted() {
    this.products = [
      {
        name: "Asus",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        price: 999.99,
        discount: 20,
        image: "/example/pc.png",
      },
      {
        name: "Iphone 12s",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        price: 499.99,
        discount: 0,
        image: "/example/pc.png",
      },

      {
        name: "MSI",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        price: 1299.99,
        discount: 100,
        image: "/example/pc.png",
      },
    ];
  },
};
</script>
