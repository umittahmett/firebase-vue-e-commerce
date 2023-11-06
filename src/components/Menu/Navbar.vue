<template>
  <!-- Navbar -->
  <div class="relative" v-on:mouseleave="dropDownMenu = false">
    <div
      class="sm:px-10 mx-auto w-full bg-white p-4 flex justify-between items-center sticky top-0 left-0 z-50 shadow-sm"
    >
      <div class="flex justify-start items-center gap-20">
        <!-- Logo -->
        <a
          href="/"
          class="text-2xl max-sm:text-lg font-medium max-sm:leading-5 leading-6 tracking-wide"
        >
          SEÇKIN <br />
          BILIŞIM
        </a>

        <!-- Nav -->
        <div
          class="justify-start text-gray-400 font-semibold gap-5 hidden lg:flex"
        >
          <div v-for="page in pages" :key="page.name" class="h-full">
            <button
              v-on:mouseover="
                page.name === 'Ürünler'
                  ? (dropDownMenu = true)
                  : (dropDownMenu = false)
              "
              class="hover:text-blue-600 transition-colors h-full"
            >
              <router-link to="">{{ page.name }}</router-link>
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-10">
        <form v-if="store" @submit.prevent="search()" action="">
          <div class="flex items-center justify-center">
            <input
              placeholder="Ürün Ara..."
              type="text"
              class="border rounded-l-md p-2 max-sm:w-[120px] w-[240px] outline-0 ring-0 focus:ring-1 focus:ring-blue-500"
              v-model="searchedWord"
            />

            <button
              class="p-2 px-4 rounded-r-md text-blue-500 border border-l-0 transition-all hover:bg-gray-200"
            >
              <img class="w-6" src="/navbar/search.png" alt="" />
            </button>
          </div>
        </form>

        <button
          class="hover:text-blue-600 transition-colors text-gray-400 font-semibold hidden lg:block"
        >
          <router-link to="">İletişim</router-link>
        </button>
      </div>

      <button class="w-7 h-7 lg:hidden">
        <img src="/navbar/bars.png" alt="" />
      </button>
    </div>

    <div
      v-if="dropDownMenu"
      class="transition-all absolute left-0 z-50 w-full animate_animated animate__fadeInUp"
    >
      <div
        class="max-w-7xl mx-auto bg-gray-50 px-10 flex justify-start items-start flex-wrap gap-6 rounded-b-md p-5"
      >
        <div
          v-for="product in products"
          :key="product.name"
          class="p-4 text-center rounded-md hover:bg-gray-100 px-8 cursor-pointer"
        >
          <img :src="product.img" alt="" class="max-w-[50px]" />
          <p class="mt-2">{{ product.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "animate.css";
import { createWizardStore } from "../../stores/counter";

export default {
  data() {
    return {
      menuToggle: false,
      pages: [
        { name: "Ürünler", href: "/" },
        { name: "Hakımızda", href: "/about" },
        { name: "Referanslar", href: "/references" },
      ],
      searchedWord: "",
      dropDownMenu: false,
      products: [
        {
          name: "Kamera",
          img: "/navbar/security-camera.png",
        },
        {
          name: "Laptop",
          img: "/navbar/laptop.png",
        },
        {
          name: "Bilgisayar",
          img: "/navbar/pc.png",
        },
        {
          name: "Monitor",
          img: "/navbar/monitor.png",
        },
      ],
      store: null,
    };
  },

  methods: {
    search() {
      localStorage.setItem("searchedWord", this.searchedWord);
      this.store.search();
    },
  },
  mounted() {
    this.store = createWizardStore();
  },
};
</script>
