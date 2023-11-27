<template>
  <div class="max-w-7xl w-full mx-auto py-5 px-3">
    <BreadCrumb />

    <!-- Image Gallery -->
    <div
      v-if="product"
      class="flex items-start flex-col lg:flex-row justify-between gap-10 mt-5"
    >
      <div
        class="card bg-[#f4f4f4] max-w-[610px] max-lg:mx-auto relative rounded-t-md w-full"
        :class="{
          ' !w-full !max-w-full h-full !fixed top-0 left-0 flex justify-center items-center z-50 bg-[rgba(0,0,0,0.8)] ':
            fullscreenView === true,
        }"
      >
        <XMarkIcon
          @click="fullscreenView = false"
          class="w-10 h-10 absolute top-5 right-5 text-white cursor-pointer hover:opacity-70 transition-opacity"
          v-if="fullscreenView"
        />

        <Galleria
          v-if="product.images"
          :value="product.images"
          :responsiveOptions="responsiveOptions"
          :numVisible="5"
          :circular="true"
          :showItemNavigators="true"
          :changeItemOnIndicatorHover="true"
        >
          <template #item="slotProps">
            <div
              class="w-full min-w-full sm:w-[610px] h-[390px] sm:h-[500px] overflow-hidden flex justify-center items-center cursor-pointer bg-[#fff]"
              @click="fullscreenView = true"
              :class="{
                ' !h-[500px] ': fullscreenView === true,
              }"
            >
              <img class="w-full" :src="slotProps.item" />
            </div>
          </template>

          <template #thumbnail="slotProps" class="z-40">
            <img
              class="object-cover bg-center w-[100px] h-[100px]"
              :src="slotProps.item"
            />
          </template>
        </Galleria>

        <!-- Onboarding Animation -->
        <div
          v-else
          class="max-w-[610px] h-[500px] max-lg:mx-auto w-full bg-slate-50 rounded-xl animate-pulse"
        ></div>

        <Sale v-if="product.discount && !fullscreenView" />
      </div>

      <!-- Product Informations -->
      <div
        v-if="product.title || product.description"
        class="text-start w-full mt-4"
      >
        <h2 class="text-4xl">{{ product.title }}</h2>

        <p class="mt-3 text-base">{{ product.description }}</p>

        <div
          class="mt-4 text-gray-700 font-light text-xl flex items-start gap-x-1"
        >
          <div class="flex items-center gap-1 justify-start w-full">
            <div v-if="product.discount" class="">
              <p class="text-gray-600 line-through text-base mr-0.5">
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

        <p class="text-sm" v-if="product.stock_count">
          stok:
          <span class="text-gray-600 font-light text-xs">
            {{ product.stock_count }}
          </span>
        </p>

        <p class="font-bold mt-4">İletişim</p>

        <div
          class="flex justify-start items-center gap-5 max-sm:flex-col max-sm:gap-2 max-sm:items-start"
        >
          <div class="mt-2 max-w-[170px] w-full">
            <p class="text-gray-400 text-sm pl-1 mt-1">+90 552 549 80 69</p>

            <a
              class="px-6 py-3 bg-green-500 rounded-xl text-white flex items-center justify-center gap-2"
              href="https://wa.me/05525498069"
            >
              <img
                class="w-8 h-8 rounded-md"
                src="/public/Logos/wp.png"
                alt=""
              />
              Whatsaspp
            </a>
          </div>

          <div class="mt-2 max-w-[170px] w-full">
            <p class="text-gray-400 text-sm pl-1 mt-1">+90 552 549 80 69</p>

            <a
              class="px-6 py-3 bg-blue-500 rounded-xl text-white flex items-center justify-center gap-2"
              href="https://wa.me/05525498069"
            >
              <img
                class="w-8 h-8 rounded-md"
                src="/public/Logos/phone.png"
                alt=""
              />
              Telefon
            </a>
          </div>
        </div>
      </div>

      <!-- Informations Onboarding Animation -->
      <div v-else class="">
        <div
          class="h-[80px] w-[600px] bg-slate-50 rounded-xl animate-pulse"
        ></div>

        <div
          class="h-[70px] w-[600px] bg-slate-50 rounded-xl animate-pulse mt-2"
        ></div>

        <div
          class="h-[40px] w-[240px] bg-slate-50 rounded-xl animate-pulse mt-2"
        ></div>

        <div
          class="h-[20px] w-[140px] bg-slate-50 rounded-xl animate-pulse mt-2"
        ></div>

        <div class="animate-pulse mt-4 flex justify-start items-center">
          <div class="px-20 py-8 bg-slate-50 rounded-xl mr-4"></div>
          <div class="px-20 py-8 bg-slate-50 rounded-xl"></div>
        </div>
      </div>
    </div>

    <!-- Imagee Gallery Onboarding animation -->
    <div
      class="w-full flex max-lg:flex-col flex-row items-center gap-10 h-[60vh] grid-cols-2 p-5"
      v-else
    >
      <div
        class="w-full h-full bg-slate-50 max-lg:grid-cols-1 grid-cols-2 rounded-xl animate-pulse"
      ></div>

      <div class="flex flex-col gap-3 w-full h-full col-span-1">
        <div
          v-for="item in 3"
          :key="item"
          class="max-h-[60px] w-full h-full bg-slate-50 max-lg:grid-cols-1 grid-cols-2 rounded-xl animate-pulse"
        ></div>
      </div>
    </div>

    <!-- Features -->
    <div class="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 border-b pb-3">
      <h2
        class="text-3xl border-b text-start mt-10 pb-2 mb-2 col-span-1 sm:col-span-2"
      >
        Ürün Özellikleri
      </h2>

      <div
        v-if="product.features"
        class="flex items-center justify-between gap-2 py-3 mt-1 p-3 border-b bg-[#F4F8FD] rounded-lg"
        v-for="feature in product.features"
        :key="feature.name"
      >
        <p class="text-gray-400 font-light m-0 max-sm:text-sm text-start">
          {{ feature.name }}
        </p>

        <p class="font-bold ml-3 m-0 max-sm:font-medium text-end">
          {{ feature.feature || "Bilinmiyor" }} {{ feature.unit_name }}
        </p>
      </div>

      <!-- Features Loading Block -->
      <div
        v-else
        class="grid grid-cols-1 col-span-2 sm:grid-cols-2 gap-4 w-full"
      >
        <div
          v-for="item in 6"
          :key="item"
          class="w-full h-12 bg-slate-50 rounded-lg animate-pulse"
        ></div>
      </div>
    </div>

    <!-- Similar Products -->
    <ProductSlider
      :name="'Benzer Ürünler'"
      v-if="!similarProductsEmpty"
      :products="similarProducts"
    />
  </div>
</template>

<script>
import Galleria from "primevue/galleria";
import BreadCrumb from "../components/Common/BreadCrumb.vue";
import Sale from "../components/Common/Sale.vue";
import ProductSlider from "../components/ProductSlider.vue";
import ProgressSpinner from "primevue/progressspinner";
import { XMarkIcon } from "@heroicons/vue/20/solid";

import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";

import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";

export default {
  data() {
    return {
      product: {},
      similarProducts: [],
      responsiveOptions: [
        {
          breakpoint: "991px",
          numVisible: 4,
        },
        {
          breakpoint: "575px",
          numVisible: 3,
        },
      ],
      similarProductsEmpty: false,
      fullscreenView: false,
    };
  },

  methods: {
    formatPrice(price) {
      if (typeof price !== "number") {
        return "e";
      }

      return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    },

    // Get Similar Products
    async getSimilarProducts() {
      const db = getFirestore();

      // Get Similar Products
      const productsRef = collection(db, "products");
      const latestProductsQuery = query(
        productsRef,
        where("id", "!=", this.product.id),
        where("brand", "==", this.product.brand),
        where("category_id", "==", this.product.category_id),
        limit(10)
      );

      const latestProductsSnapshot = await getDocs(latestProductsQuery);
      if (!latestProductsSnapshot.empty) {
        latestProductsSnapshot.forEach(async (product) => {
          const productData = {
            id: product.id,
            created_date: product.data().created_date,
            title: product.data().title,
            description: product.data().description,
            price: product.data().price,
            discount: product.data().discount,
            cover_image: product.data().cover_image,
            brand: product.data().brand,
          };
          this.similarProducts.push(productData);
        });
      } else {
        this.similarProductsEmpty = true;
      }
    },

    // Get Product Data
    async getOverviewProductData() {
      const db = getFirestore();
      const storage = getStorage();

      const cur_overview_product_id = localStorage.getItem(
        "cur_overview_product_id"
      );

      const cur_overview_category_id = localStorage.getItem(
        "cur_overview_category_id"
      );

      if (!cur_overview_product_id) return;

      try {
        const [productData, images, features] = await Promise.all([
          this.getProductData(db, cur_overview_product_id),
          this.getProductImages(storage, `product_${cur_overview_product_id}`),
          this.getProductFeatures(
            db,
            cur_overview_product_id,
            cur_overview_category_id
          ),
        ]);

        if (productData) {
          productData.images = images;
          productData.features = features;

          this.product = productData;
          console.log(productData);
          localStorage.setItem(
            "curent_overview_product_data",
            JSON.stringify(productData)
          );
        }
      } catch (error) {
        console.error(error);
      }
    },

    // Helper functions
    async getProductData(db, productId) {
      const productRef = doc(db, "products", productId);
      const productSnapshot = await getDoc(productRef);

      return productSnapshot ? productSnapshot.data() : null;
    },

    // Get Product Images
    async getProductImages(storage, imagesFolder) {
      const imagesRef = ref(storage, `products_images/${imagesFolder}`);
      const res = await listAll(imagesRef);

      return Promise.all(
        res.items.map(async (itemRef) => getDownloadURL(itemRef))
      );
    },
    // Get Product Features
    async getProductFeatures(db, productId, categoryId) {
      try {
        const productCategoryFeaturesRef = collection(
          db,
          "product_cetegory_features"
        );
        const productCategoryFeaturesQuery = query(
          productCategoryFeaturesRef,
          where("category_id", "==", categoryId)
        );

        const productCategoryFeaturesSnapshot = await getDocs(
          productCategoryFeaturesQuery
        );

        if (productCategoryFeaturesSnapshot.empty) return [];

        const featurePromises = productCategoryFeaturesSnapshot.docs.map(
          async (featureDoc) => {
            const featureData = featureDoc.data();
            const productsFeaturesRef = collection(db, "products_features");
            const productsFeaturesQuery = query(
              productsFeaturesRef,
              where("product_id", "==", productId),
              where("product_category_feature_id", "==", featureData.id)
            );

            const productsFeaturesSnapshot = await getDocs(
              productsFeaturesQuery
            );

            return productsFeaturesSnapshot.docs.map((featureValueDoc) => {
              const featureValueData = featureValueDoc.data();
              return {
                name: featureData.name,
                unit_name: featureData.unit_name,
                feature: featureValueData.unit_value,
              };
            });
          }
        );

        const features = (await Promise.all(featurePromises)).flat();
        console.log("Features:", features); // Debug için eklendi
        return features;
      } catch (error) {
        console.error("Error in getProductFeatures:", error); // Debug için eklendi
        return [];
      }
    },
  },

  async mounted() {
    // Get last searched word or category name from localstorage
    const storageProductModel = localStorage.getItem(
      "curent_overview_product_data"
    );
    const storageProduct = JSON.parse(storageProductModel);

    const cur_overview_product_id = localStorage.getItem(
      "cur_overview_product_id"
    );

    if (storageProduct && storageProduct.id === cur_overview_product_id) {
      this.product = storageProduct;
      console.log("storage den geldi");
    } else {
      await this.getOverviewProductData();
      console.log("veritabanindandan geldi");
    }
    await this.getSimilarProducts();
  },

  components: {
    Galleria,
    BreadCrumb,
    Sale,
    ProductSlider,
    ProgressSpinner,
    XMarkIcon,
  },
};
</script>
