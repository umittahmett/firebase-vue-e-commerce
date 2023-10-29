<template>
  <div class="max-w-7xl w-full mx-auto">
    <BreadCrumb class="border-b-0 mt-4 mb-4" />
    <div class="flex justify-start items-start gap-4">
      <div class="w-full rounded-md max-w-[200px]">
        <!-- Category Filter -->
        <div class="w-full rounded-md bg-gray-50 p-2 border">
          <p class="border-b mb-2">Kaetegori</p>
          <div
            v-for="category in categories"
            :key="category.name"
            class="flex item-center gap-1 justify-start mt-1 rounded-md hover:bg-gray-200 p-1 px-2 cursor-pointer"
          >
            <input
              :id="category.name"
              :name="category.name"
              type="checkbox"
              class="cursor-pointer"
            />
            <label
              :for="category.name"
              class="text-gray-400 font-light cursor-pointer"
            >
              {{ category.name }}
            </label>
          </div>
        </div>

        <!-- Price Filter -->
        <div class="w-full rounded-md bg-gray-50 p-2 border mt-2">
          <p class="border-b mb-2">Fiyat</p>

          <form action="">
            <div class="flex items-center justify-center mr-auto max-w-xl">
              <input
                placeholder="Min"
                type="text"
                class="border rounded-md p-1.5 w-full outline-0 ring-0 focus:ring-1 focus:ring-blue-500"
              />

              <p class="px-1">-</p>

              <input
                placeholder="Max"
                type="text"
                class="border rounded-md p-1.5 w-full outline-0 ring-0 focus:ring-1 focus:ring-blue-500"
              />

              <button
                class="ml-1 rounded-md bg-blue-500 border transition-all hover:bg-gray-200"
              >
                <img class="w-full p-1.5" src="/Logos/searchWhite.png" alt="" />
              </button>
            </div>

            <div
              v-for="range in priceRanges"
              :key="range"
              class="flex item-center gap-1 justify-start mt-2 rounded-md hover:bg-gray-200 p-1 px-2 text-sm cursor-pointer"
            >
              <input
                :id="range.min"
                :name="range.min"
                type="checkbox"
                class="cursor-pointer"
              />
              <label
                :for="range.min"
                class="text-gray-400 font-light cursor-pointer"
              >
                {{ range.min }}
              </label>

              <p class="px-1">-</p>

              <label
                :for="range.min"
                class="text-gray-400 font-light cursor-pointer"
              >
                {{ range.max === 0 ? "ve üstü" : range.max + " TL" }}
              </label>
            </div>
          </form>
        </div>
      </div>

      <div>
        <!-- Search Bar -->
        <form action="">
          <div class="flex items-center justify-center mr-auto max-w-xl">
            <input
              placeholder="Ürün Ara..."
              type="text"
              class="border rounded-l-md p-2 w-full outline-0 ring-0 focus:ring-1 focus:ring-blue-500"
            />
            <button
              class="p-2 px-4 rounded-r-md text-blue-500 border border-l-0 transition-all hover:bg-gray-200"
            >
              <img class="w-6" src="/navbar/search.png" alt="" />
            </button>
          </div>
        </form>

        <!-- Products -->
        <div class="grid grid-cols-4 justify-center items-start gap-5 mt-4">
          <div
            v-for="product in products"
            :key="product.name"
            class="border rounded-md w-fit cursor-pointer overflow-hidden"
          >
            <div class="relative mx-auto">
              <img
                class="object-cover bg-center w-[300px] h-[300px] rounded-t-md hover:scale-105 transition-all"
                :src="'/public/example/img1.webp'"
                alt=""
              />
              <Sale :bgColor="'blue'" v-if="product.discount" />
            </div>
            <div class="px-2">
              <h4 class="font-medium text-xl line-clamp-1 mt-4">
                {{ product.name }}
              </h4>

              <p class="text-gray-500 line-clamp-2 mt-2 font-light">
                {{ product.description }}
              </p>

              <div
                class="my-2 text-gray-700 font-light text-xl flex items-start gap-x-1"
              >
                <div class="flex items-start gap-1 justify-start w-full">
                  <div v-if="product.discount" class="">
                    <p class="text-gray-600 line-through text-base">
                      {{ product.price }}&#8378;
                    </p>
                  </div>

                  {{
                    product.discount
                      ? product.price - (product.price / 100) * product.discount
                      : product.price
                  }}&#8378;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "../components/Common/BreadCrumb.vue";
export default {
  data() {
    return {
      categories: [
        { name: "Bilgisayar" },
        { name: "Monitor" },
        { name: "Laptop" },
        { name: "Kamera" },
      ],
      priceRanges: [
        { min: 500, max: 1000 },
        { min: 1000, max: 5000 },
        { min: 10000, max: 20000 },
        { min: 20000, max: 0 },
      ],
      products: [
        {
          name: "Asus",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          price: 999.99,
          discount: 20,
          image: "/example/pc.png",
        },
        {
          name: "Iphone 12s",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.ipsum dolor sit amet consectetur adipiscing elit.",
          price: 499.99,
          discount: 0,
          image: "/example/pc.png",
        },

        {
          name: "Asus",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          price: 999.99,
          discount: 20,
          image: "/example/pc.png",
        },
        {
          name: "Iphone 12s",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.ipsum dolor sit amet consectetur adipiscing elit.",
          price: 499.99,
          discount: 0,
          image: "/example/pc.png",
        },
        {
          name: "Asus",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          price: 999.99,
          discount: 20,
          image: "/example/pc.png",
        },
        {
          name: "Iphone 12s",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.ipsum dolor sit amet consectetur adipiscing elit.",
          price: 499.99,
          discount: 0,
          image: "/example/pc.png",
        },

        {
          name: "MSI",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          price: 1299.99,
          discount: 10,
          image: "/example/pc.png",
        },

        {
          name: "MSI",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          price: 1299.99,
          discount: 10,
          image: "/example/pc.png",
        },
      ],
    };
  },
  components: {
    BreadCrumb,
  },
};
</script>
