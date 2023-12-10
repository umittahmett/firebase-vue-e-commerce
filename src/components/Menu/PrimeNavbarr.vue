<template>
  <div class="w-full">
    <div
      class="grid grid-cols-5 gap-4 mb-4 w-full p-4 max-w-7xl mx-auto max-[1300px]:grid-cols-4 max-lg:grid-cols-3 py-10"
    >
      <div v-for="category in categories[0].items" :key="category.id">
        <h1 class="text-lg font-semibold px-4">{{ category.name }}</h1>
        <div class="flex flex-col justify-start items-start">
          <a
            class="text-gray-400 px-4 py-2 hover:bg-[#F4F8FD] transition-colors w-full cursor-pointer"
            v-for="sub_category in category.sub_categories"
            :key="sub_category.id"
          >
            {{ sub_category.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Avatar from "primevue/avatar";
import Menubar from "primevue/menubar";
import Badge from "primevue/badge";
import CascadeSelect from "primevue/cascadeselect";

import {
  getFirestore,
  collection,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import { createWizardStore } from "../../stores/counter.js";

export default {
  data() {
    return {
      selectedMenu: null,
      categories: [
        {
          label: "Ürünler",
          icon: "pi pi-mobile",
          items: [],
        },
      ],
      store: null,
    };
  },
  methods: {
    handleMenuItemClick(label) {
      console.log(`Tıklanan menü öğesi: ${label}`);
    },

    goToPage(url) {
      if (url === "/") {
        this.$router.push("/");
      }
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
  components: {
    InputText,
    Avatar,
    Menubar,
    Badge,
    CascadeSelect,
  },

  async mounted() {
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

    this.store = createWizardStore();
  },
};
</script>
