<template>
  <div class="max-w-7xl w-full mx-auto my-20 px-2">
    <div class="flex justify-between items-center w-full">
      <h2 class="text-xl font-medium">Our Best Seller</h2>
      <button
        class="hover:text-blue-500 transition-colors hover:border-blue-500 text-xl font-medium border-b border-black"
      >
        View All Best Sellers
      </button>
    </div>

    <div class="flex justify-between items-start text-center gap-4 mt-10">
      <div v-for="product in products" :key="product.name" class="relative">
        <img
          class="object-cover bg-center w-[400px] h-[380px]"
          :src="product.image"
          alt=""
        />
        <div class="px-2">
          <h4 class="font-medium text-xl line-clamp-2 mt-4">
            {{ product.name }}
          </h4>

          <p class="text-gray-500 line-clamp-4 mt-4 font-light">
            {{ product.description }}
          </p>

          <p class="mt-4 text-gray-700 font-light text-xl">
            {{ product.price }} &#8378;
          </p>
        </div>
        <Sale v-if="product.discount" />
      </div>
    </div>
  </div>
</template>
<script>
import Sale from "../components/Common/Sale.vue";

export default {
  components: { Sale },
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
