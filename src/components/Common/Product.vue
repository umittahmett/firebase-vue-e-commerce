<template>
  <a href="/overview">
    <div
      @click="sendProductId(product.id)"
      :class="{
        'text-start': text_align === 'start',
      }"
      class="text-center rounded-md overflow-hidden w-fit flex flex-col justify-center items-center h-[450px]"
    >
      <div
        class="relative w-full mx-auto h-[250px] overflow-hidden flex justify-center items-center"
      >
        <img class="w-full rounded-t-md" :src="product.cover_image" alt="" />

        <Sale :bgColor="'blue'" v-if="product.discount" />
      </div>

      <div
        class="p-2 flex flex-col justify-between w-full h-[200px] bg-[#F4F8FD]"
      >
        <div class="text-start mr-auto">
          <h4 class="font-medium text-lg leading-[20px] line-clamp-3 mt-1">
            {{ product.title }}
          </h4>

          <p class="mt-2 line-clamp-2 text-gray-500 leading-5">
            {{ product.description }}
          </p>
        </div>

        <div
          class="mt-4 text-gray-700 font-light text-xl flex items-center gap-x-1"
        >
          <div
            class="flex items-center flex-col justify-center w-full"
            :class="{
              '!justify-start': text_align === 'start',
            }"
          >
            <div v-if="product.discount" class="">
              <p class="text-gray-600 line-through text-sm mr-0.5 mb-0">
                {{ formatPrice(product.price) }}&#8378;
              </p>
            </div>

            <p class="text-2xl font-bold">
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

    sendProductId(id) {
      localStorage.setItem("cur_overview_product_id", id);
      console.log("current id :", id);
    },
  },
  mounted() {
    this.store = createWizardStore();
  },
};
</script>
