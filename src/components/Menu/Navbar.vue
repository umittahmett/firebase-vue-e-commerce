<template>
  <div>
    <!-- Navbar -->
    <div class="bg-[#F4F8FD] z-50 shadow-sm pb-2 flex items-center">
      <div class="relative max-w-[1600px] mx-auto w-full">
        <div
          class="sm:px-5 mx-auto w-full p-3 grid grid-cols-9 max-lg:flex justify-between items-center gap-4"
        >
          <div class="col-span-2">
            <!-- Logo -->
            <a href="/">
              <img
                class="max-sm:w-[140px] w-[200px] flex-shrink-0"
                src="/public/Logos/sckn.png"
                alt=""
              />
            </a>
          </div>

          <div class="flex gap-2 col-span-4 mx-auto w-full">
            <form
              class="w-full"
              v-if="store"
              @submit.prevent="search()"
              action=""
            >
              <div class="flex items-center w-full h-10 sm:h-12 lg:h-14">
                <input
                  required
                  placeholder="Ürün Ara..."
                  type="text"
                  class="border rounded-l-md w-full h-full outline-0 ring-0 focus:ring-1 focus:ring-blue-500 px-3"
                  v-model="searchedWord"
                />

                <button
                  class="px-6 max-lg:px-3 h-full rounded-r-md bg-blue-500 border border-l-0 transition-all hover:bg-blue-600"
                >
                  <img class="w-7" src="/Logos/searchWhite.png" alt="" />
                </button>
              </div>
            </form>
          </div>

          <button
            @click="mobileNavbarVisible = true"
            class="w-7 h-7 lg:hidden col-span-1 ml-auto flex-shrink-0"
          >
            <img src="/navbar/bars.png" alt="" />
          </button>

          <!-- Nav -->
          <div
            class="justify-end text-gray-400 font-semibold gap-5 col-span-3 flex max-lg:hidden"
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
                  >{{ page.name }}
                  <ChevronDownIcon v-if="page.dropDown" class="w-5"
                /></router-link>
              </button>
            </div>
          </div>
        </div>

        <div
          v-if="dropDownMenu"
          v-on:mouseleave="dropDownMenu = false"
          class="transition-all fixed left-0 mt-1 z-[100] w-full animate__animated animate__fadeInUp"
        >
          <div
            class="max-w-7xl relative mx-auto bg-[#F4F8FD] px-3 sm:px-10 py-10 flex max-lg:grid max-lg:grid-cols-3 justify-center lg:justify-start items-start flex-wrap gap-2 sm:gap-6 rounded-b-md p-2 sm:p-5"
          >
            <button
              class="lg:hidden absolute top-2 right-2"
              @click="dropDownMenu = false"
            >
              <XMarkIcon
                class="w-6 h-6 text-white"
                :class="{ '!text-blue-500': mobileNavbarVisible === true }"
              />
            </button>

            <a
              href="/search"
              v-for="category in categories"
              :key="category.name"
              class="p-2 sm:p-4 text-center rounded-md hover:bg-gray-100 lg:px-8 cursor-pointer"
              @click="store && store.addSearchedCategory(category.id)"
            >
              <img
                :src="category.image"
                alt=""
                class="max-w-[50px] max-sm:w-[30px] mx-auto"
              />
              <p class="mt-2">{{ category.name }}</p>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Navbar -->
    <div
      v-if="mobileNavbarVisible"
      class="fixed h-full top-0 left-0 w-full bg-[#F4F8FD] p-4 py-6 z-[90]"
    >
      <div class="w-full flex items-center justify-between">
        <!-- Logo -->
        <a href="/"
          ><img class="w-[120px]" src="/public/Logos/sckn.png" alt=""
        /></a>

        <button
          @click="(mobileNavbarVisible = false), (dropDownMenu = false)"
          class="hover:opacity-80 transition-opacity"
        >
          <XMarkIcon
            class="w-10 h-10 text-white"
            :class="{ '!text-blue-500': mobileNavbarVisible === true }"
          />
        </button>
      </div>

      <!-- Nav -->
      <div
        class="mt-20 flex flex-col gap-y-5 justify-center text-gray-400 font-semibold gap-5 mx-auto text-lg"
      >
        <div v-if="mobileNavbarVisible" v-for="page in pages" :key="page.name">
          <button
            v-on:click="
              page.name === 'Ürünler'
                ? (dropDownMenu = true)
                : (dropDownMenu = false)
            "
            class="hover:text-blue-600 transition-colors"
          >
            <router-link class="flex" to=""
              >{{ page.name }}
              <ChevronDownIcon v-if="page.dropDown" class="w-5"
            /></router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "animate.css";
import { createWizardStore } from "../../stores/counter";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/vue/20/solid";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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
      categories: [],
      store: null,
      mobileNavbarVisible: false,
    };
  },
  components: {
    ChevronDownIcon,
    XMarkIcon,
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
  async mounted() {
    this.store = createWizardStore();

    const db = getFirestore();
    const categories = collection(db, "categories");
    const categoriesSnapshot = await getDocs(categories);
    categoriesSnapshot.forEach((category) => {
      const categoryData = {
        id: category.id,
        name: category.data().name,
        image: category.data().image
          ? category.data().image
          : "/navbar/unknown.png",
      };
      this.categories.push(categoryData);
    });
    //>
  },
};
</script>
