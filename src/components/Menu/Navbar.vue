<template>
  <!-- Navbar -->
  <div class="bg-[#F4F8FD] z-50 shadow-sm pb-2">
    <div class="relative" v-on:mouseleave="dropDownMenu = false">
      <div
        class="sm:px-5 mx-auto w-full p-3 grid grid-cols-4 max-lg:grid-cols-2 justify-between"
      >
        <div class="flex justify-start items-center gap-20 col-span-1">
          <!-- Logo -->
          <a
            href="/"
            class="text-2xl max-sm:text-lg font-medium max-sm:leading-5 leading-6 tracking-wide"
          >
            SEÇKIN <br />
            BILIŞIM
          </a>
        </div>

        <div
          class="flex flex-col justify-end gap-2 col-span-2 mx-auto w-full max-lg:hidden"
        >
          <form
            class="w-full"
            v-if="store"
            @submit.prevent="search()"
            action=""
          >
            <div class="flex items-center w-full">
              <input
                placeholder="Ürün Ara..."
                type="text"
                class="border rounded-l-md p-3 w-full outline-0 ring-0 focus:ring-1 focus:ring-blue-500"
                v-model="searchedWord"
              />

              <button
                class="p-3 px-6 rounded-r-md bg-blue-500 border border-l-0 transition-all hover:bg-blue-600"
              >
                <img class="w-7" src="/Logos/searchWhite.png" alt="" />
              </button>
            </div>
          </form>
        </div>

        <button
          class="hover:text-blue-600 transition-colors text-gray-400 font-semibold hidden lg:block ml-auto"
        >
          <router-link to="">İletişim</router-link>
        </button>

        <button class="w-7 h-7 lg:hidden col-span-1 ml-auto">
          <img src="/navbar/bars.png" alt="" />
        </button>
      </div>

      <div
        v-if="dropDownMenu"
        class="transition-all absolute mt-8 left-0 z-50 w-full animate_animated animate__fadeInUp"
      >
        <div
          class="max-w-7xl mx-auto bg-[#F4F8FD] px-10 flex justify-start items-start flex-wrap gap-6 rounded-b-md p-5"
        >
          <a
            href="/search"
            v-for="product in products"
            :key="product.name"
            class="p-4 text-center rounded-md hover:bg-gray-100 px-8 cursor-pointer"
            @click="store && store.addSearchedCategory(product.id)"
          >
            <img :src="product.img" alt="" class="max-w-[50px] mx-auto" />
            <p class="mt-2">{{ product.name }}</p>
          </a>
        </div>
      </div>
    </div>

    <!-- Nav -->
    <div
      class="justify-center text-gray-400 font-semibold gap-5 flex mx-auto max-lg:hidden"
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
          <router-link class="flex" to=""
            >{{ page.name }} <ChevronDownIcon v-if="page.dropDown" class="w-5"
          /></router-link>
        </button>
      </div>
    </div>

    <div
      class="flex flex-col justify-end gap-2 col-span-2 w-full lg:hidden max-w-4xl mx-auto px-3"
    >
      <form class="w-full" v-if="store" @submit.prevent="search()" action="">
        <div class="flex items-center w-full">
          <input
            placeholder="Ürün Ara..."
            type="text"
            class="border rounded-l-sm p-3 w-full outline-0 ring-0 focus:ring-1 focus:ring-blue-500"
            v-model="searchedWord"
            :class="{
              'border-red-400': wordEmptyAlert === true,
            }"
          />

          <button
            class="p-3 px-6 rounded-r-md bg-blue-500 border border-l-0 transition-all hover:bg-blue-600"
          >
            <img class="w-7" src="/Logos/searchWhite.png" alt="" />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import "animate.css";
import { createWizardStore } from "../../stores/counter";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";

export default {
  data() {
    return {
      menuToggle: false,
      pages: [
        { name: "Ürünler", href: "/", dropDown: true },
        { name: "Hakımızda", href: "/about", dropDown: false },
        { name: "Referanslar", href: "/references", dropDown: false },
      ],
      searchedWord: "",
      dropDownMenu: false,
      wordEmptyAlert: false,
      products: [
        {
          id: 3,
          name: "Gvenlik Kamerası",
          img: "/navbar/security-camera.png",
        },
        {
          id: 1,
          name: "Laptop",
          img: "/navbar/laptop.png",
        },
        {
          id: 0,
          name: "Bilgisayar",
          img: "/navbar/pc.png",
        },
        {
          id: 2,
          name: "Monitör",
          img: "/navbar/monitor.png",
        },
      ],
      store: null,
    };
  },
  components: {
    ChevronDownIcon,
  },
  methods: {
    search() {
      const now = Date.now(); // Şu anki tarih ve saat Unix timestamp formatında
      const dataToStore = {
        word: this.searchedWord,
        addingDate: now,
      };

      localStorage.setItem("searchedWord", JSON.stringify(dataToStore));

      if (this.searchedWord === "") {
        this.wordEmptyAlert = true;
      } else {
        this.wordEmptyAlert = false;
        this.store.products = [];
        this.store.search();
        this.$router.push("/search");
      }
      if (this.$route.path.includes("/search")) {
        window.location.reload();
      }
    },
  },
  mounted() {
    this.store = createWizardStore();
  },
};
</script>
