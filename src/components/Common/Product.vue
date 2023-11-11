<template>
  <router-link to="/overview">
    <div
      @click="sendProductId(product.id)"
      :class="{
        'text-start': text_align === 'start',
      }"
      class="text-center rounded-md overflow-hidden w-fit flex flex-col justify-center items-center"
    >
      <div class="relative w-fit mx-auto h-full">
        <img
          class="object-cover bg-center w-[220px] h-[250px] rounded-t-md"
          :src="'/public/example/img1.webp'"
          alt=""
        />
        <Sale :bgColor="'blue'" v-if="product.discount" />
      </div>
      <div
        class="p-2 flex flex-col justify-between h-full mx-auto max-w-[220px]"
      >
        <div>
          <h4 class="font-medium text-lg line-clamp-2 mt-1">
            {{ product.title }}
          </h4>

          <p class="text-gray-500 line-clamp-2 font-light">
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
              <p class="text-gray-600 line-through text-sm mr-0.5">
                {{ formatPrice(product.price) }}&#8378;
              </p>
            </div>

            <p class="text-2xl font-medium">
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
  </router-link>
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
