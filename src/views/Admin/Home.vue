<template>
  <div class="max-w-7xl w-full mx-auto px-3">
    <form
      class="w-full mb-6 max-w-3xl mx-auto"
      v-if="store"
      @submit.prevent="search()"
      action=""
    >
      <div class="flex items-center w-full h-10 sm:h-12 lg:h-14">
        <input
          required
          placeholder="Ürün Ara..."
          type="text"
          class="border rounded-l-md w-full h-full outline-0 ring-0 focus:ring-1 focus:ring-blue-500 px-3 bg-[#F4F8FD]"
          v-model="searchedWord"
        />

        <button
          class="px-6 max-lg:px-3 h-full rounded-r-md bg-blue-500 border border-l-0 transition-all hover:bg-blue-600"
        >
          <img class="w-7" src="/Logos/searchWhite.png" alt="" />
        </button>
      </div>
    </form>
    <div class="flex justify-start items-start gap-4">
      <!-- Filters -->
      <div
        class="w-full rounded-md min-w-[200px] max-w-[200px] max-lg:hidden"
        v-if="store && store.products && displayedProducts.length > 0"
      >
        <!-- Price Filter -->
        <div class="w-full rounded-md bg-gray-50 p-2 border text-center">
          <p class="mb-3 text-start">Fiyat</p>

          <form
            @submit.prevent="
              minPrice || maxPrice ? priceFilter() : (priceFilterError = true)
            "
          >
            <div class="flex items-center justify-center mr-auto max-w-xl">
              <input
                placeholder="Min"
                type="number"
                required
                class="border rounded-md p-1.5 w-full outline-0 ring-0 focus:ring-1 focus:ring-blue-500"
                v-model="minPrice"
              />

              <p class="px-1">-</p>

              <input
                placeholder="Max"
                type="number"
                required
                class="border rounded-md p-1.5 w-full outline-0 ring-0 focus:ring-1 focus:ring-blue-500"
                v-model="maxPrice"
              />

              <button
                type="submit"
                class="ml-1 rounded-md bg-blue-500 border transition-all hover:bg-blue-600"
              >
                <img class="w-full p-1.5" src="/Logos/searchWhite.png" alt="" />
              </button>
            </div>

            <div
              class="flex item-center flex-col gap-3 justify-start mt-2 rounded-md p-1 px-2 text-sm cursor-pointer"
            >
              <div
                v-if="store && store.products"
                v-for="range in store.priceRanges"
                :key="range.id"
                class="flex align-items-center"
              >
                <input
                  class="!accent-blue-500 w-5 h-5 cursor-pointer"
                  v-model="range.activity"
                  :inputId="range.id"
                  name="pizza"
                  value="Cheese"
                  type="radio"
                  @change="selectFilter(range.min, range.max)"
                />
                <label :for="range.id" class="ml-2 text-gray-500"
                  >{{ range.min + " - " + range.max }}
                </label>
              </div>
            </div>
          </form>

          <Button
            v-if="filteredProducts"
            @click="deleteFilter()"
            :buttonType="'blue'"
            class="!px-3 !py-2 !text-sm !mx-auto mt-3"
            >Filtreyi Kaldir</Button
          >
        </div>
      </div>

      <!-- Products List -->
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-center items-start gap-2"
      >
        <div
          v-if="store && !store.loading && displayedProducts.length > 0"
          class="w-full flex justify-between items-center col-span-2 sm:col-span-3 md:col-span-4 py-4 max-sm:flex-col max-sm:gap-4 max-sm:text-center"
        >
          <p class="mt-2 text-gray-500 text-lg font-light">
            "{{ searchedWord }}" araması için
            <span class="!text-black">{{
              store && store.products.length
            }}</span>
            ürün listeleniyor.
          </p>

          <div class="flex items-center gap-4 relative">
            <div>
              <!-- Price Filter -->
              <button
                @click="priceFilterVisible = true"
                class="border rounded-md p-2 px-6 bg-gray-50 lg:hidden"
              >
                Fiyat
              </button>

              <div
                v-if="priceFilterVisible"
                class="w-full rounded-md bg-gray-50 p-2 border lg:hidden absolute top-0 left-0 z-50"
              >
                <form
                  @submit.prevent="
                    minPrice || maxPrice
                      ? priceFilter()
                      : (priceFilterError = true)
                  "
                >
                  <div class="w-full text-end">
                    <button @click="priceFilterVisible = false">
                      <XMarkIcon class="w-7 h-7" />
                    </button>
                  </div>
                  <div
                    class="flex items-center justify-center mr-auto max-w-xl"
                  >
                    <input
                      placeholder="Min"
                      type="number"
                      required
                      class="border rounded-md p-1.5 w-full outline-0 ring-0 focus:ring-1 focus:ring-blue-500"
                      v-model="minPrice"
                    />

                    <p class="px-1">-</p>

                    <input
                      placeholder="Max"
                      type="number"
                      required
                      class="border rounded-md p-1.5 w-full outline-0 ring-0 focus:ring-1 focus:ring-blue-500"
                      v-model="maxPrice"
                    />

                    <button
                      type="submit"
                      class="ml-1 rounded-md bg-blue-500 border transition-all hover:bg-blue-600"
                    >
                      <img
                        class="w-full p-1.5"
                        src="/Logos/searchWhite.png"
                        alt=""
                      />
                    </button>
                  </div>

                  <div
                    class="flex item-center flex-col gap-3 justify-start mt-2 rounded-md p-1 px-2 text-sm cursor-pointer"
                  >
                    <div
                      v-if="store && store.products"
                      v-for="range in store.priceRanges"
                      :key="range.id"
                      class="flex align-items-center"
                    >
                      <input
                        class="!accent-blue-500 w-5 h-5 cursor-pointer"
                        v-model="range.activity"
                        :inputId="range.id"
                        name="pizza"
                        value="Cheese"
                        type="radio"
                        @change="selectFilter(range.min, range.max)"
                      />
                      <label :for="range.id" class="ml-2 text-gray-500">{{
                        range.min + " - " + range.max
                      }}</label>
                    </div>
                  </div>
                </form>

                <Button
                  v-if="filteredProducts"
                  @click="deleteFilter()"
                  :buttonType="'blue'"
                  class="!px-3 !py-2 !text-sm !mx-auto mt-3"
                  >Filtreyi Kaldir</Button
                >
              </div>
            </div>

            <select
              class="border rounded-md p-3 px-6 bg-gray-50"
              name="sirala"
              id="sirala"
              v-model="selectedListType"
              @change="changeSelectedListType(selectedListType)"
            >
              <option value="0">Önerilen Sıralama</option>
              <option value="1">Artan Fiyat</option>
              <option value="2">Azalan Fiyat</option>
            </select>
          </div>
        </div>

        <Product
          v-for="(product, index) in displayedProducts"
          :url="'/lorem-seckn_bil-admin/update-product'"
          :key="index"
          :product="product"
          :text_align="'start'"
          class="border rounded-md w-fit cursor-pointer overflow-hidden"
        />
      </div>

      <!-- Fail Result  -->
      <div
        class="w-full text-center h-[200px] text-xl text-blue-500 flex justify-center items-center flex-col"
        v-if="store && !store.loading && displayedProducts.length === 0"
      >
        <img src="/public/icons/sad.png" class="w-[100px] h-[100px]" alt="" />

        <p class="mt-2">"{{ searchedWord }}" aramanız için sonuç bulunamadı.</p>

        <div class="text-sm text-start max-w-[500px] mt-5">
          <div class="flex items-center gap-2">
            <p
              class="w-[10px] h-[10px] rounded-full bg-blue-500 flex-shrink-0"
            ></p>
            Yukarıda yer alan aramanıza benzer tahminlere göz atın
          </div>

          <div class="flex items-center gap-2">
            <p
              class="w-[10px] h-[10px] rounded-full bg-blue-500 flex-shrink-0"
            ></p>
            Yazım kurallarına uyarak daha genel aramalar yapmayı tercih edin
          </div>
        </div>
      </div>

      <!-- Onboarding Animation -->
      <div
        v-if="store && store.loading && store.loading === true"
        class="grid sm:grid-cols-4 justify-center items-start gap-2 w-full"
      >
        <div
          v-for="i in 8"
          :key="i"
          class="w-full h-full min-h-[200px] lg:min-h-[300px] bg-slate-50 rounded-lg animate-pulse"
        ></div>
      </div>
    </div>

    <!-- Pagination -->
    <div
      class="flex items-center justify-center sm:justify-end border-t border-gray-200 bg-white py-10 mt-10 sm:mt-20 sm:py-20"
    >
      <div>
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            @click="goToPage(0)"
            :disabled="currentPage === 0"
            class="relative inline-flex items-center px-4 py-2 text-sm font-medium max-sm:px-3 max-sm:py-1.5 max-sm:text-xs max-sm:font-normal text-gray-500 bg-white border border-gray-300 rounded-l-md hover:text-gray-700 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <ChevronDoubleLeftIcon class="w-5" />
          </button>

          <button
            @click="prevPage"
            :disabled="currentPage === 0"
            class="relative inline-flex items-center px-4 py-2 text-sm font-medium max-sm:px-3 max-sm:py-1.5 max-sm:text-xs max-sm:font-normal text-gray-500 bg-white border border-gray-300 hover:text-gray-700 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <ChevronLeftIcon class="w-5" />
          </button>

          <template v-if="pageCount <= 3">
            <button
              v-for="pageNumber in pageCount"
              :key="pageNumber"
              @click="goToPage(pageNumber - 1)"
              :class="{
                'relative inline-flex items-center px-4 py-2 text-sm font-medium max-sm:px-3 max-sm:py-1.5 max-sm:text-xs max-sm:font-normal text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 focus:z-20 focus:outline-offset-0 focus:bg-blue-600':
                  currentPage === pageNumber - 1,
                'relative inline-flex items-center px-4 py-2 text-sm font-medium max-sm:px-3 max-sm:py-1.5 max-sm:text-xs max-sm:font-normal text-gray-500 bg-white border border-gray-300 hover:text-gray-700 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
                  currentPage !== pageNumber - 1,
              }"
            >
              {{ pageNumber }}
            </button>
          </template>

          <template v-else>
            <button
              v-for="pageNumber in displayedPages"
              :key="pageNumber"
              @click="goToPage(pageNumber - 1)"
              :class="{
                'relative inline-flex items-center px-4 py-2 text-sm font-medium max-sm:px-3 max-sm:py-1.5 max-sm:text-xs max-sm:font-normal text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 focus:z-20 focus:outline-offset-0 focus:bg-blue-600':
                  currentPage === pageNumber - 1,
                'relative inline-flex items-center px-4 py-2 text-sm font-medium max-sm:px-3 max-sm:py-1.5 max-sm:text-xs max-sm:font-normal text-gray-500 bg-white border border-gray-300 hover:text-gray-700 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
                  currentPage !== pageNumber - 1,
              }"
            >
              {{ pageNumber }}
            </button>

            <span
              v-if="currentPage + 3 < pageCount"
              class="relative inline-flex items-center px-4 py-2 text-sm font-medium max-sm:px-3 max-sm:py-1.5 max-sm:text-xs max-sm:font-normal text-gray-500 bg-white border border-gray-300 focus:z-20 focus:outline-offset-0"
            >
              ...
            </span>
          </template>

          <button
            @click="nextPage"
            :disabled="currentPage === pageCount - 1"
            class="relative inline-flex items-center px-4 py-2 text-sm font-medium max-sm:px-3 max-sm:py-1.5 max-sm:text-xs max-sm:font-normal text-gray-500 bg-white border border-gray-300 hover:text-gray-700 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <ChevronRightIcon class="w-5" />
          </button>

          <button
            @click="goToPage(pageCount - 1)"
            :disabled="currentPage === pageCount - 1"
            class="relative inline-flex items-center px-4 py-2 text-sm font-medium max-sm:px-3 max-sm:py-1.5 max-sm:text-xs max-sm:font-normal text-gray-500 bg-white border border-gray-300 rounded-r-md hover:text-gray-700 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <ChevronDoubleRightIcon class="w-5" />
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "../../components/Common/BreadCrumb.vue";
import Button from "../../components/Common/Button.vue";
import Product from "../../components/Common/Product.vue";
import { createWizardStore } from "../../stores/counter";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
  XMarkIcon,
  FaceSmileIcon,
} from "@heroicons/vue/20/solid";
import RadioButton from "primevue/radiobutton";

export default {
  data() {
    return {
      categories: [
        { name: "Bilgisayar" },
        { name: "Monitor" },
        { name: "Laptop" },
        { name: "Kamera" },
      ],

      priceFilterError: false,
      searchedWord: "",

      selectedListType: 0,
      minPrice: null,
      maxPrice: null,
      store: null,
      filteredProducts: null,
      itemsPerPage: 20,
      currentPage: 0,
      priceFilterVisible: false,
    };
  },

  computed: {
    pageCount() {
      return Math.ceil(
        this.store && this.store.products.length / this.itemsPerPage
      );
    },

    startIndex() {
      return this.currentPage * this.itemsPerPage;
    },

    endIndex() {
      return Math.min(
        (this.currentPage + 1) * this.itemsPerPage - 1,
        this.store && this.store.products.length - 1
      );
    },

    displayedPages() {
      if (this.pageCount <= 3) {
        return Array.from({ length: this.pageCount }, (_, i) => i + 1);
      } else {
        const startPage = Math.max(1, this.currentPage - 1);
        const endPage = Math.min(this.pageCount, startPage + 2);
        return Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => i + startPage
        );
      }
    },

    displayedProducts() {
      return this.filteredProducts
        ? this.filteredProducts.slice(this.startIndex, this.endIndex + 1)
        : (this.store &&
            this.store.products.slice(this.startIndex, this.endIndex + 1)) ||
            [];
    },
  },

  methods: {
    deleteFilter() {
      this.filteredProducts = null;
      this.maxPrice = null;
      this.minPrice = null;

      this.store &&
        this.store.priceRanges.map((range) => {
          range.activity = false;
        });

      this.priceFilterVisible = false;
    },

    priceFilter() {
      const products = this.store.products;
      this.filteredProducts = this.store.products.filter((product) => {
        const discountedPrice = product.discount
          ? (product.price * (100 - product.discount)) / 100
          : product.price;

        const meetsMinPrice =
          this.minPrice === undefined || discountedPrice >= this.minPrice;
        const meetsMaxPrice =
          this.maxPrice === undefined || discountedPrice <= this.maxPrice;

        return meetsMinPrice && meetsMaxPrice;
      });
      this.priceFilterVisible = false;
    },

    nextPage() {
      if (this.currentPage < this.pageCount - 1) {
        this.currentPage++;
      }
    },

    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },

    goToPage(page) {
      this.currentPage = page;
    },

    changeSelectedListType(newVal) {
      switch (parseInt(newVal)) {
        case 1:
          this.filteredProducts
            ? this.filteredProducts.sort((a, b) => a.price - b.price)
            : this.store &&
              this.store.products.sort((a, b) => a.price - b.price);
          break;
        case 2:
          this.filteredProducts
            ? this.filteredProducts.sort((a, b) => b.price - a.price)
            : this.store &&
              this.store.products.sort((a, b) => b.price - a.price);
          break;

        case 0:
          this.filteredProducts
            ? this.filteredProducts.sort((a, b) => {
                return b.created_date.seconds - a.created_date.seconds;
              })
            : this.store &&
              this.store.products.sort((a, b) => {
                return b.created_date.seconds - a.created_date.seconds;
              });
          break;
        default:
          console.log("e");
          break;
      }
    },

    selectFilter(min, max) {
      this.minPrice = min;
      this.maxPrice = max;
      this.priceFilter();
    },

    calculatePriceRanges() {
      const allPrices = this.displayedProducts.map((product) => product.price);

      // Eğer ürünlerin fiyat bilgisi varsa devam et, yoksa varsayılan bir değer kullan
      const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
      const maxPrice = allPrices.length > 0 ? Math.max(...allPrices) : 0;

      // Ortak fiyat aralıkları oluştur
      this.priceRanges = [];
      for (let i = 0; i < 5; i++) {
        const rangeWidth = (maxPrice - minPrice) / 5;
        const minRange = minPrice + i * rangeWidth;
        const maxRange = minPrice + (i + 1) * rangeWidth;

        this.priceRanges.push({
          id: i,
          min: Math.floor(minRange / 1000) * 1000,
          max: Math.ceil(maxRange / 1000) * 1000,
          activity: false,
        });
      }

      // En yüksek fiyat aralığı "ve üstü" olarak güncellenir
      this.priceRanges[this.priceRanges.length - 1].max = "ve üstü";
    },

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
        window.location.reload();
      }
    },
  },

  watch: {},

  components: {
    BreadCrumb,
    Product,
    ChevronLeftIcon,
    ChevronRightIcon,
    RadioButton,
    ChevronDoubleRightIcon,
    ChevronDoubleLeftIcon,
    XMarkIcon,
    Button,
  },
  mounted() {
    const searchedWordMethod = localStorage.getItem("searchedWord");
    const searchedCategoryMethod = localStorage.getItem("searchedCategory");

    const searchedWordJSON = searchedWordMethod
      ? JSON.parse(searchedWordMethod)
      : null;
    const searchedCategoryJSON = searchedCategoryMethod
      ? JSON.parse(searchedCategoryMethod)
      : null;

    if (!searchedWordJSON && !searchedCategoryJSON) {
      this.searchedWord = "Bilgisayar";
    } else {
      if (searchedWordJSON && searchedCategoryJSON) {
        this.searchedWord =
          searchedWordJSON.addingDate > searchedCategoryJSON.addingDate
            ? searchedWordJSON.word
            : searchedCategoryJSON.category_name;
      } else if (!searchedWordJSON && searchedCategoryJSON) {
        this.searchedWord = searchedCategoryJSON.category_name;
      } else if (searchedWordJSON && !searchedCategoryJSON) {
        this.searchedWord = searchedWordJSON.word;
      }
    }

    this.store = createWizardStore();
    this.store.search();
  },
};
</script>

<!-- <form class="w-full max-w-xl mx-auto" @submit.prevent="search()" action="">
  <div class="flex items-center w-full h-10 sm:h-12 lg:h-14">
    <input
      required
      placeholder="Ürün Ara..."
      type="text"
      class="border rounded-l-md w-full h-full outline-0 ring-0 focus:ring-1 focus:ring-[#10b981] px-3"
      v-model="searchedWord"
    />

    <button
      class="px-6 max-lg:px-3 h-full rounded-r-md bg-[#10b981] border border-l-0 transition-all hover:bg-[#4bbc96]"
    >
      <img class="w-7" src="/public/Logos/searchWhite.png" alt="" />
    </button>
  </div>
</form> -->
