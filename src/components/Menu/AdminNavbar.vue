<template>
  <div>
    <!-- Admin Page Navbar -->
    <div class="bg-[#F4F8FD] z-50 shadow-sm pb-2 flex items-center">
      <div class="relative max-w-[1600px] mx-auto w-full">
        <div class="sm:px-5 mx-auto w-full p-3 flex start items-center gap-10">
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
                @click="changeselectedAdminMenu(page.name)"
                v-on:mouseover="
                  page.name === 'Ürünler'
                    ? (dropDownMenu = true)
                    : (dropDownMenu = false)
                "
                class="hover:text-[#10b981] transition-colors h-full"
                :class="{
                  'text-[#10b981]': selectedAdminMenu === page.name,
                }"
              >
                <a :href="page.href" class="flex"
                  >{{ page.name }}
                  <ChevronDownIcon v-if="page.dropDown" class="w-5"
                /></a>
              </button>
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

        <button
          @click="(mobileNavbarVisible = false), (dropDownMenu = false)"
          class="hover:opacity-80 transition-opacity"
        >
          <XMarkIcon
            class="w-10 h-10 text-white"
            :class="{ '!text-[#10b981]': mobileNavbarVisible === true }"
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
            class="hover:text-[#10b981] transition-colors"
          >
            <div v-if="page.href">
              <a :href="page.href" class="flex"
                >{{ page.name }}
                <ChevronDownIcon v-if="page.dropDown" class="w-5"
              /></a>
            </div>

            <div v-else>
              <button class="flex">
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
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default {
  data() {
    return {
      selectedAdminMenu: "",
      menuToggle: false,
      pages: [
        { name: "Anasayfa", href: "/lorem-seckn_bil-admin", dropDown: false },

        {
          name: "Ürün Ekle",
          href: "/lorem-seckn_bil-admin/add-product",
          dropDown: false,
        },
        {
          name: "Kategori Ekle",
          href: "/lorem-seckn_bil-admin/add-category",
          dropDown: false,
        },
        {
          name: "Kategori Güncelle",
          href: "/lorem-seckn_bil-admin/update-category",
          dropDown: false,
        },

        {
          name: "Referans Ekle",
          href: "/lorem-seckn_bil-admin/add-reference",
          dropDown: false,
        },
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
    changeselectedAdminMenu(pageName) {
      localStorage.setItem("selectedAdminMenu", pageName);
    },
  },
  async mounted() {
    this.selectedAdminMenu = localStorage.getItem("selectedAdminMenu");
    this.store = createWizardStore();
    const db = getFirestore();
    const categories = collection(db, "categories");
    const categoriesSnapshot = await getDocs(categories);

    // Get images for each category
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
  },
};
</script>
