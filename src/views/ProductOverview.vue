<template>
  <div class="max-w-7xl w-full mx-auto py-5 px-3">
    <BreadCrumb />

    <!-- Image Gallery -->
    <div
      v-if="product.id"
      class="flex items-start flex-col lg:flex-row justify-between gap-10 mt-5"
    >
      <div
        class="card bg-[#f4f4f4] max-w-[610px] max-lg:mx-auto relative rounded-t-md"
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
          :value="product.images"
          :responsiveOptions="responsiveOptions"
          :numVisible="5"
          :circular="true"
          :showItemNavigators="true"
          :changeItemOnIndicatorHover="true"
        >
          <template #item="slotProps">
            <div
              class="w-full sm:w-[610px] h-[390px] sm:h-[500px] overflow-hidden flex justify-center items-center cursor-pointer bg-[#fff]"
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
        <Sale v-if="product.discount && !fullscreenView" />
      </div>
      <div class="text-start w-full mt-4">
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

        <div class="flex justify-start items-center gap-5">
          <div class="mt-2">
            <p class="text-gray-400 text-sm pl-1 mt-1">+90 552 549 80 69</p>

            <a
              class="px-6 py-3 bg-green-500 rounded-xl text-white flex items-center gap-2"
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

          <div class="mt-2">
            <p class="text-gray-400 text-sm pl-1 mt-1">+90 552 549 80 69</p>

            <a
              class="px-6 py-3 bg-blue-500 rounded-xl text-white flex items-center gap-2"
              href="https://wa.me/05525498069"
            >
              <img
                class="w-8 h-8 rounded-md"
                src="/public/Logos/phone.png"
                alt=""
              />
              Phone
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Imagee Gallery Loading Block -->
    <div
      class="w-full flex max-lg:flex-col flex-row items-center gap-10 h-[60vh] grid-cols-2 p-5"
      v-else
    >
      <div
        class="w-full h-full bg-slate-300 max-lg:grid-cols-1 grid-cols-2 rounded-xl animate-pulse"
      ></div>

      <div class="flex flex-col gap-3 w-full h-full col-span-1">
        <div
          class="max-h-[60px] w-full h-full bg-slate-300 max-lg:grid-cols-1 grid-cols-2 rounded-xl animate-pulse"
        ></div>

        <div
          class="max-h-[60px] w-full h-full bg-slate-300 max-lg:grid-cols-1 grid-cols-2 rounded-xl animate-pulse"
        ></div>

        <div
          class="max-h-[60px] w-full h-full bg-slate-300 max-lg:grid-cols-1 grid-cols-2 rounded-xl animate-pulse"
        ></div>
      </div>
    </div>

    <!-- Features -->
    <h2 class="text-3xl border-b text-start mt-10 pb-2 mb-2">
      Ürün Özellikleri
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 border-b pb-3">
      <div
        v-if="product.id"
        class="flex items-center justify-between gap-2 py-3 mt-1 p-3 border-b bg-gray-100 rounded-lg"
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
        <div class="w-full h-12 bg-slate-300 rounded-lg animate-pulse"></div>

        <div class="w-full h-12 bg-slate-300 rounded-lg animate-pulse"></div>

        <div class="w-full h-12 bg-slate-300 rounded-lg animate-pulse"></div>

        <div class="w-full h-12 bg-slate-300 rounded-lg animate-pulse"></div>

        <div class="w-full h-12 bg-slate-300 rounded-lg animate-pulse"></div>

        <div class="w-full h-12 bg-slate-300 rounded-lg animate-pulse"></div>
      </div>
    </div>

    <!-- Similar Products -->
    <ProductSlider v-if="!similarProductsEmpty" :products="similarProducts" />
  </div>
</template>

<script>
import Galleria from "primevue/galleria";
import BreadCrumb from "../components/Common/BreadCrumb.vue";
import Sale from "../components/Common/Sale.vue";
import ProductSlider from "../components/ProductSlider.vue";
import ProgressSpinner from "primevue/progressspinner";

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
import { XMarkIcon } from "@heroicons/vue/20/solid";

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
          console.log(productData);
          this.similarProducts.push(productData);
        });
      } else {
        this.similarProductsEmpty = true;
      }

      //>
    },

    // Get Product Data
    async getOverviewProductData() {
      const db = getFirestore();
      const storage = getStorage();

      const cur_overview_product_id = localStorage.getItem(
        "cur_overview_product_id"
      );

      if (cur_overview_product_id) {
        const productRef = doc(db, "products", cur_overview_product_id);
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot) {
          const productData = productSnapshot.data();
          console.log(productData);
          // Get Product Images
          const imagesRef = ref(
            storage,
            `products_images/${productData.images_folder}`
          );
          productData.images = [];
          try {
            const res = await listAll(imagesRef);
            await Promise.all(
              res.items.map(async (itemRef) => {
                const url = await getDownloadURL(itemRef);
                productData.images.push(url);
                console.log(url);
              })
            );
          } catch (error) {
            switch (error.code) {
              case "storage/object-not-found":
                console.log("File doesn't exist");
                break;
              case "storage/unauthorized":
                console.log(
                  "User doesn't have permission to access the object"
                );
                break;
              case "storage/canceled":
                console.log("User canceled the upload");
                break;
              case "storage/unknown":
                console.log(
                  "Unknown error occurred, inspect the server response"
                );
                break;
              default:
                console.log(error);
            }
          }

          console.log("features does work1");

          // Get Category Name
          const categoriesRef = collection(db, "categories");
          const categoryQuery = query(
            categoriesRef,
            where("id", "==", productData.category_id)
          );

          const categorySnapshot = await getDocs(categoryQuery);

          if (!categorySnapshot.empty) {
            productData.category_name = categorySnapshot.docs[0].data().name;
          }
          console.log("features does work2");

          // Get Feature Types
          const product_category_featuresRef = collection(
            db,
            "product_cetegory_features"
          );
          const product_category_featuresQuery = query(
            product_category_featuresRef,
            where("category_id", "==", productData.category_id)
          );

          console.log("productData.category_id: ", productData.category_id);
          const product_category_featuresSnapshot = await getDocs(
            product_category_featuresQuery
          );

          console.log(
            "product_cetegory_featuresSnapshot :",
            product_category_featuresSnapshot.docs
          );

          console.log("features does work3");

          if (!product_category_featuresSnapshot.empty) {
            // Array to store promises for product features
            const featurePromises = [];

            for (const featureDoc of product_category_featuresSnapshot.docs) {
              console.log("features does work 4");

              const featureData = featureDoc.data();

              // Create a separate array for each feature
              const product_features = [];

              // Query For Get Unit Values Of Current Product Feature
              const products_featuresRef = collection(db, "products_features");
              const products_featuresQuery = query(
                products_featuresRef,
                where("product_id", "==", cur_overview_product_id),
                where("product_category_feature_id", "==", featureData.id) // Add this condition
              );

              // Collect the promise for the product features query
              const featurePromise = getDocs(products_featuresQuery).then(
                (products_featuresSnapshot) => {
                  for (const featureValueDoc of products_featuresSnapshot.docs) {
                    console.log("products aliniyor");
                    const featureValueData = featureValueDoc.data();
                    product_features.push({
                      name: featureData.name,
                      unit_name: featureData.unit_name,
                      feature: featureValueData.unit_value,
                    });
                    console.log(product_features);
                  }

                  return product_features;
                }
              );

              featurePromises.push(featurePromise);
            }

            // Wait for all featurePromises to resolve
            const allFeatures = await Promise.all(featurePromises);

            // Flatten the array of arrays into a single array of features
            const flattenedFeatures = allFeatures.flat();

            // Assign the features to the productData
            productData.features = flattenedFeatures;
          } else {
            console.log("features is empty");
          }

          this.product = productData;
          console.log(productData);
        }
      }
    },
  },

  async mounted() {
    await this.getOverviewProductData();
    await this.getSimilarProducts();
    console.log(JSON.stringify(this.product));
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
