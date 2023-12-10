<template>
  <div>
    <!-- Navbar -->
    <div class="bg-[#F4F8FD] z-50 shadow-sm pb-2 flex items-center">
      <div class="relative max-w-[1600px] mx-auto w-full">
        <div
          class="sm:px-5 mx-auto w-full p-3 grid grid-cols-9 max-lg:flex justify-between items-center gap-4"
        >
          <!-- Logo -->
          <div class="col-span-2">
            <a href="/">
              <img
                class="max-sm:w-[140px] w-[200px] flex-shrink-0"
                src="/public/Logos/sckn.png"
                alt=""
              />
            </a>
          </div>

          <!-- Search Product -->
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

          <!-- Open Mobile Menu -->
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
                <a :href="page.href" class="flex"
                  >{{ page.name }}
                  <ChevronDownIcon v-if="page.dropDown" class="w-5"
                /></a>
              </button>
            </div>
          </div>
        </div>

        <!-- Categories Dropdown Menu -->
        <div
          v-if="dropDownMenu"
          v-on:mouseleave="dropDownMenu = false"
          v-clickout="clickOutside"
          class="transition-all fixed left-0 mt-1 z-[100] w-full animate__animated animate__fadeInUp bg-white"
        >
          <!-- Desktop Categories View -->
          <div
            class="grid-cols-5 gap-4 mb-4 w-full p-4 max-w-7xl mx-auto max-[1300px]:grid-cols-4 max-lg:grid-cols-3 py-10 lg:grid hidden"
          >
            <div
              v-if="categories"
              v-for="category in categories[0].items"
              :key="category.id"
            >
              <h1 class="text-lg font-semibold px-4">{{ category.name }}</h1>
              <div class="flex flex-col justify-start items-start">
                <a
                  @click="
                    store &&
                      store.addSearchedCategory(
                        sub_category.id,
                        sub_category.name
                      )
                  "
                  href="/search"
                  class="text-gray-400 px-4 py-2 hover:bg-[#F4F8FD] transition-colors w-full cursor-pointer"
                  v-for="sub_category in category.sub_categories"
                  :key="sub_category.id"
                >
                  {{ sub_category.name }}
                </a>
              </div>
            </div>
          </div>

          <!-- Mobile Categories View -->
          <div class="flex-col max-lg:flex hidden w-full">
            <div
              v-if="categories"
              v-for="category in categories[0].items"
              :key="category.id"
            >
              <button
                @click="mobileCategoriesVisible(category.id)"
                class="flex items-center justify-between gap-2 text-lg py-3 px-4 border-t border-t-gray-100 w-full"
              >
                <p class="">
                  {{ category.name }}
                </p>

                <ChevronDownIcon
                  :class="{
                    '-rotate-90': category.sub_categories_visible === true,
                  }"
                  class="w-6 h-6 text-blue-500 transition-all"
                />
              </button>

              <div
                v-if="category.sub_categories_visible"
                class="flex flex-col justify-start items-start border-t-gray-50 w-full animate__animated animate__fadeIn transition-all duration-[0.01s]"
              >
                <div
                  class="w-full"
                  v-for="sub_category in category.sub_categories"
                  :key="sub_category.id"
                >
                  <a
                    @click="
                      store &&
                        store.addSearchedCategory(
                          sub_category.id,
                          sub_category.name
                        )
                    "
                    href="/search"
                    class="text-gray-400 flex items-center justify-start px-4 py-3 hover:bg-[#F4F8FD] border-t-gray-50 border-t transition-colors w-full cursor-pointer ml-2"
                  >
                    {{ sub_category.name }}
                  </a>
                </div>
              </div>
            </div>
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

        <!-- Close Mobile Menu -->
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
        class="mt-20 w-full flex flex-col gap-y-1 justify-center text-gray-400 font-semibold gap-5 mx-auto text-lg"
      >
        <div
          class="w-full"
          v-if="mobileNavbarVisible"
          v-for="page in pages"
          :key="page.name"
        >
          <button
            v-on:click="
              page.name === 'Ürünler'
                ? (dropDownMenu = true)
                : (dropDownMenu = false)
            "
            class="hover:text-blue-600 transition-colors w-full"
          >
            <div v-if="page.href" class="w-full py-3 px-4">
              <a :href="page.href" class="flex items-center gap-1 w-full"
                >{{ page.name }}
                <ChevronDownIcon v-if="page.dropDown" class="w-5"
              /></a>
            </div>

            <div v-else class="w-full py-3 px-4">
              <button class="flex items-center gap-1 w-full">
                {{ page.name }}
                <ChevronDownIcon v-if="page.dropDown" class="w-5" />
              </button>
            </div>
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
import vClickout from "vue3-clickout";

import {
  getFirestore,
  collection,
  where,
  getDocs,
  query,
} from "firebase/firestore";

export default {
  data() {
    return {
      menuToggle: false,

      pages: [
        { name: "Ürünler", dropDown: true },
        { name: "Hakımızda", href: "#about", dropDown: false },
        { name: "İletişim", href: "#contact", dropDown: false },
      ],

      categories: [
        {
          label: "Ürünler",
          icon: "pi pi-mobile",
          items: [],
        },
      ],

      searchedWord: "",
      dropDownMenu: false,
      wordEmptyAlert: false,
      store: null,
      mobileNavbarVisible: false,
    };
  },
  directives: {
    clickout: vClickout,
  },
  components: {
    ChevronDownIcon,
    XMarkIcon,
  },

  methods: {
    mobileCategoriesVisible(category_id) {
      this.categories[0].items.map((category) => {
        if (
          category.id === category_id &&
          category.sub_categories_visible === true
        ) {
          category.sub_categories_visible = false;
        } else if (category.id === category_id) {
          category.sub_categories_visible = true;
        } else {
          category.sub_categories_visible = false;
        }
      });
    },

    clickOutside(event) {
      this.dropDownMenu === true ? (this.dropDownMenu = false) : "";
      console.log("clicked out");
    },

    // Search Products
    search() {
      const now = Date.now();
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
    // Get Global Categories
    const GlovbalCategoriesRef = collection(db, "global_categories");
    const GlobalCategorySnapshot = await getDocs(GlovbalCategoriesRef);
    if (!GlobalCategorySnapshot.empty) {
      const globalCategories = GlobalCategorySnapshot.docs;

      globalCategories.forEach(async (category) => {
        const category_data = {
          id: category.id,
          name: category.data().name,
          sub_categories_visible: false,
          sub_categories: [],
        };

        const SubCategoriesRef = collection(db, "categories");
        const SubCategoriesQuery = query(
          SubCategoriesRef,
          where("global_category_id", "==", category.id)
        );
        const SubCategoriesSnapshot = await getDocs(SubCategoriesQuery);
        SubCategoriesSnapshot.forEach((sub_category) => {
          category_data.sub_categories.push({
            id: sub_category.id,
            name: sub_category.data().name,
          });
        });

        this.categories[0].items.push(category_data);
      });
    } else {
      console.log("global categories is empty");
    }
  },
};
</script>
