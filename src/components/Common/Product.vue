<template>
  <!-- Product Component -->
  <a :href="url" class="w-full">
    <div
      @click="sendProductId(product.id, product.category_id)"
      :class="{
        'text-start': text_align === 'start',
      }"
      class="text-center rounded-md overflow-hidden w-full flex flex-col justify-center items-center h-[400px]"
    >
      <!-- Image -->
      <div
        class="relative w-full mx-auto h-[230px] overflow-hidden flex justify-center items-center"
      >
        <img
          class="w-full p-2 rounded-t-md"
          :src="product.cover_image"
          alt=""
        />

        <Sale :bgColor="'blue'" v-if="product.discount" />
      </div>

      <!-- Product Information -->
      <div
        class="p-2 flex flex-col justify-between w-full h-[180px] bg-[#F4F8FD]"
      >
        <!-- Title & Description -->
        <div class="text-start mr-auto w-full">
          <h4
            class="font-medium text-lg leading-[20px] line-clamp-2 mt-1 break-all w-full"
          >
            {{ product.title }}
          </h4>

          <p class="mt-2 line-clamp-2 text-gray-500 leading-5 break-all w-full">
            {{ product.description }}
          </p>
        </div>

        <!-- Price -->
        <div
          class="mt-4 text-gray-700 font-light text-xl flex items-center gap-x-1 w-full"
        >
          <div
            class="flex items-center flex-col justify-center w-full"
            :class="{
              '!justify-start': text_align === 'start',
            }"
          >
            <div v-if="product.discount" class="w-full">
              <p class="text-gray-600 line-through text-sm mr-0.5 mb-0 w-full">
                {{ formatPrice(product.price) }}&#8378;
              </p>
            </div>

            <p class="text-2xl font-bold w-full">
              {{
                formatPrice(
                  product.discount
                    ? product.price - (product.price / 100) * product.discount
                    : product.price
                )
              }}&#8378;
            </p>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import Sale from "./Sale.vue";
import { createWizardStore } from "../../stores/product_overview.js";
export default {
  props: {
    product: {
      type: Object,
      default: null,
    },
    text_align: {
      typeof: String,
      default: "start",
    },
    url: {
      typeof: String,
      default: "/overview",
    },
  },

  components: { Sale },

  data() {
    return {
      store: null,
    };
  },

  methods: {
    formatPrice(price) {
      if (typeof price !== "number") {
        return "Geçersiz bir sayı girdiniz";
      }

      return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    },

    sendProductId(id, category_id) {
      localStorage.setItem("cur_overview_product_id", id);
      localStorage.setItem("cur_overview_category_id", category_id);
    },
  },

  mounted() {
    this.store = createWizardStore();
  },
};
</script>
