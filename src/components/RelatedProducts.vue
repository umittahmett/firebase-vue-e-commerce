<template>
  <div class="max-w-7xl w-full mx-auto py-10 px-2">

    <h2 class="text-xl font-medium">Related Products</h2>

    <div class="flex items-center text-center gap-4 gap-y-10 mt-10 lg:flex-row flex-col justify-between w-full">
      <div v-for="product in products" :key="product.name" class="relative ">
        <img
          class="object-cover bg-center w-[400px] h-[340px]"
          :src="product.image"
          alt=""
        />
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
        
        <Sale :bgColor="'black'" v-if="product.discount" />
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
        discount: 10,
        image: "/example/pc.png",
      },
    ];
  },
};
</script>
