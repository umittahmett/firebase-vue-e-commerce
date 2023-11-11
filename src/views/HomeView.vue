<template>
  <div>
    <LogoSlider />
    <About class="mt-10" />
    <ProductSlider
      :name="'Yeni Gelenler'"
      :products="newArrivals"
      class="mt-10"
    />
    <PopularCategory class="mt-10" />
    <ProductSlider
      :name="'En Çok Satanlar'"
      :products="popular"
      class="mt-10"
    />

    <OurMission id="mission" class="mt-10" />
    <Features />
  </div>
</template>

<script>
import About from "../components/About.vue";
import ProductSlider from "../components/ProductSlider.vue";
import LogoSlider from "../components/LogoSlider.vue";
import PopularCategory from "../components/PopularCategory.vue";
import OurMission from "../components/OurMission.vue";
import Features from "../components/Features.vue";

import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

export default {
  data() {
    return {
      newArrivals: [],
      popular: [],
      products: [],
      loading: true,
    };
  },

  components: {
    LogoSlider,
    About,
    ProductSlider,
    PopularCategory,
    OurMission,
    Features,
  },

  async mounted() {
    const db = getFirestore();

    // Limited Filter
    const productsRef = collection(db, "products");
    const productsQuery = query(
      productsRef,
      orderBy("created_date", "desc"),
      limit(10)
    );
    const latestProductsSnapshot = await getDocs(productsQuery);

    const latestProducts = [];

    latestProductsSnapshot.forEach((product) => {
      const productData = {
        id: product.id,
        created_date: product.data().created_date,
      };
      latestProducts.push(productData);
    });

    // Best Sellers Ref
    const stocksRef = collection(db, "stocks");
    const stockQuery = query(
      stocksRef,
      orderBy("sell_count", "desc"),
      limit(10)
    );
    const topSellingStocksSnapshot = await getDocs(stockQuery);

    const topSellingProducts = [];

    topSellingStocksSnapshot.forEach((stock) => {
      const productData = {
        id: stock.data().product_id,
        sell_count: stock.data().sell_count,
      };
      topSellingProducts.push(productData);
    });

    // Hem son eklenen hem de en çok satan ürünler için ayrı Firestore sorguları yapın
    const latestProductDetailsQuery = query(
      productsRef,
      where(
        "id",
        "in",
        latestProducts.map((product) => product.id)
      )
    );

    const topSellingProductDetailsQuery = query(
      productsRef,
      where(
        "id",
        "in",
        topSellingProducts.map((product) => product.id)
      )
    );

    const latestProductDetailsSnapshot = await getDocs(
      latestProductDetailsQuery
    );

    const topSellingProductDetailsSnapshot = await getDocs(
      topSellingProductDetailsQuery
    );

    // Get New Arrivals
    latestProducts.forEach((product) => {
      const productDetails = latestProductDetailsSnapshot.docs.find(
        (doc) => doc.data().id === product.id
      );
      product.title = productDetails.data().title;
      product.description = productDetails.data().description;
      product.price = productDetails.data().price;
      product.discount = productDetails.data().discount;
    });

    // Get Best Sellers
    topSellingProducts.forEach((product) => {
      const productDetails = topSellingProductDetailsSnapshot.docs.find(
        (doc) => doc.data().id === product.id
      );
      product.title = productDetails.data().title;
      product.description = productDetails.data().description;
      product.price = productDetails.data().price;
      product.discount = productDetails.data().discount;
    });

    this.newArrivals = latestProducts;
    this.popular = topSellingProducts;
  },
};
</script>
