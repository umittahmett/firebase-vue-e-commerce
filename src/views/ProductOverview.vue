<template>
  <div class="max-w-7xl w-full mx-auto py-5 px-3">
    <BreadCrumb />
    <div
      v-if="product.id"
      class="flex items-start flex-col lg:flex-row justify-between gap-10 mt-5"
    >
      <div class="card bg-[#f4f4f4] max-w-[610px] relative max-lg:mx-auto">
        <Galleria
          :value="product.images"
          :responsiveOptions="responsiveOptions"
          :numVisible="5"
          :circular="true"
          :showItemNavigators="true"
        >
          <template #item="slotProps">
            <div
              class="w-full sm:w-[610px] h-[320px] sm:h-[500px] overflow-hidden flex justify-center items-center"
            >
              <img
                class="object-cover bg-center overflow-hidden"
                :src="slotProps.item.itemImageSrc"
                :alt="slotProps.item.alt"
                style="width: 100%; display: block"
              />
            </div>
          </template>

          <template #thumbnail="slotProps">
            <img
              class="object-cover bg-center w-[100px] h-[100px]"
              :src="slotProps.item.thumbnailImageSrc"
              :alt="slotProps.item.alt"
              style="display: block"
            />
          </template>
        </Galleria>
        <Sale v-if="product.discount" />
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

        <p class="text-sm">
          stok:
          <span class="text-gray-600 font-light text-xs">
            {{ product.stock_count }} 20</span
          >
        </p>

        <p class="font-bold mt-6">İletişim</p>

        <div class="flex justify-start items-center gap-5">
          <div class="mt-2">
            <p class="text-gray-400 text-sm pl-1 mt-1">+905527273780</p>

            <a
              class="px-6 py-3 bg-green-500 rounded-xl text-white flex items-center gap-2"
              href="https://wa.me/05527273780"
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
            <p class="text-gray-400 text-sm pl-1 mt-1">+905527273780</p>

            <a
              class="px-6 py-3 bg-blue-500 rounded-xl text-white flex items-center gap-2"
              href="https://wa.me/05527273780"
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

    <div class="w-full flex items-center gap-10 h-[60vh] p-5" v-else>
      <div
        class="w-full h-full bg-slate-300 grid-cols-2 rounded-xl animate-pulse"
      ></div>

      <div class="flex flex-col gap-3 w-full h-full">
        <div
          class="w-full h-full bg-slate-300 grid-cols-2 rounded-xl animate-pulse"
        ></div>

        <div
          class="w-full h-full bg-slate-300 grid-cols-2 rounded-xl animate-pulse"
        ></div>

        <div
          class="w-full h-full bg-slate-300 grid-cols-2 rounded-xl animate-pulse"
        ></div>
      </div>
    </div>

    <!-- Features -->
    <h2 class="text-3xl border-b text-start mt-10 pb-2 mb-2">
      Product Features
    </h2>

    <div class="grid grid-cols-2 w-full gap-4 border-b pb-3">
      <div
        v-if="product.id"
        class="flex items-center justify-between gap-2 py-2.5 mt-1 p-4 border-b bg-gray-100 rounded-lg"
        v-for="feature in product.features"
        :key="feature.name"
      >
        <p class="text-gray-400 font-light">{{ feature.name }}</p>
        <p class="font-bold">{{ feature.feature }} {{ feature.unit_name }}</p>
      </div>

      <div v-else class="grid col-span-2 grid-cols-2 gap-4 w-full">
        <div class="w-full h-12 bg-slate-300 rounded-lg animate-pulse"></div>

        <div class="w-full h-12 bg-slate-300 rounded-lg animate-pulse"></div>

        <div class="w-full h-12 bg-slate-300 rounded-lg animate-pulse"></div>

        <div class="w-full h-12 bg-slate-300 rounded-lg animate-pulse"></div>

        <div class="w-full h-12 bg-slate-300 rounded-lg animate-pulse"></div>

        <div class="w-full h-12 bg-slate-300 rounded-lg animate-pulse"></div>
      </div>
    </div>

    <ProductSlider :products="products" />
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
} from "firebase/firestore";

export default {
  data() {
    return {
      product: {},

      products: [
        {
          name: "Asus",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          price: 999.99,
          discount: 20,
          image: "/about.png",
        },
        {
          name: "Iphone 12s",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.ipsum dolor sit amet consectetur adipiscing elit.",
          price: 499.99,
          discount: 0,
          image: "/about.png",
        },

        {
          name: "Asus",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          price: 999.99,
          discount: 20,
          image: "/about.png",
        },
        {
          name: "Iphone 12s",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.ipsum dolor sit amet consectetur adipiscing elit.",
          price: 499.99,
          discount: 0,
          image: "/about.png",
        },
        {
          name: "Asus",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          price: 999.99,
          discount: 20,
          image: "/about.png",
        },
        {
          name: "Iphone 12s",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.ipsum dolor sit amet consectetur adipiscing elit.",
          price: 499.99,
          discount: 0,
          image: "/about.png",
        },

        {
          name: "MSI",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          price: 1299.99,
          discount: 10,
          image: "/about.png",
        },

        {
          name: "MSI",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          price: 1299.99,
          discount: 10,
          image: "/public/example/pc.png",
        },
      ],

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
    };
  },

  methods: {
    formatPrice(price) {
      if (typeof price !== "number") {
        return "e";
      }

      return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    },
  },
  async mounted() {
    const db = getFirestore();
    const cur_overview_product_id = localStorage.getItem(
      "cur_overview_product_id"
    );

    if (cur_overview_product_id) {
      const productsRef = collection(db, "products");
      const queryRef = query(
        productsRef,
        where("id", "==", parseInt(cur_overview_product_id))
      );
      const productSnapshot = await getDocs(queryRef);

      if (!productSnapshot.empty) {
        const productData = productSnapshot.docs[0].data();

        productData.images = [
          {
            itemImageSrc: "/public/example/pc.png",
            thumbnailImageSrc: "/public/example/pc.png",
            alt: "Image 1",
          },
          {
            itemImageSrc: "/public/example/img2.webp",
            thumbnailImageSrc: "/public/example/img2.webp",
            alt: "Image 2",
          },
          {
            itemImageSrc: "/public/example/img3.webp",
            thumbnailImageSrc: "/public/example/img3.webp",
            alt: "Image 3",
          },
          {
            itemImageSrc: "/public/example/img1.webp",
            thumbnailImageSrc: "/public/example/img1.webp",
            alt: "Image 4",
          },
          {
            itemImageSrc: "/public/example/img2.webp",
            thumbnailImageSrc: "/public/example/img2.webp",
            alt: "Image 5",
          },
          {
            itemImageSrc: "/public/example/img3.webp",
            thumbnailImageSrc: "/public/example/img3.webp",
            alt: "Image 6",
          },
          {
            itemImageSrc: "/public/hero/herobg.jpg",
            thumbnailImageSrc: "/public/hero/herobg.jpg",
            alt: "Image 7",
          },
        ];

        // Get Brand Name
        const brandsRef = collection(db, "brands");
        const brandQuery = query(
          brandsRef,
          where("id", "==", productData.brand_id)
        );
        const brandSnapshot = await getDocs(brandQuery);

        if (!brandSnapshot.empty) {
          productData.brand_name = brandSnapshot.docs[0].data().name;
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
          where("category_id", "==", productData.id)
        );

        const product_category_featuresSnapshot = await getDocs(
          product_category_featuresQuery
        );

        console.log(
          "product_category_featuresSnapshot :",
          product_category_featuresSnapshot.docs
        );

        console.log("features does work3");

        if (product_category_featuresSnapshot.docs) {
          for (const featureDoc of product_category_featuresSnapshot.docs) {
            console.log("features does work 4");

            const featureData = featureDoc.data();

            // Query For Get Unit Values Of Current Product Feature
            const products_featuresRef = collection(db, "products_features");
            const products_featuresQuery = query(
              products_featuresRef,
              where("product_id", "==", productData.id)
            );
            const products_featuresSnapshot = await getDocs(
              products_featuresQuery
            );
            let product_features = [];

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

            productData.features = product_features;
          }
        } else {
          console.log("features is empty");
        }

        this.product = productData;
        console.log(productData);
      }
    }
  },
  components: {
    Galleria,
    BreadCrumb,
    Sale,
    ProductSlider,
    ProgressSpinner,
  },
};
</script>
