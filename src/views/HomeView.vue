<template>
  <!-- Home Page -->
  <div>
    <Hero />
    <LogoSlider />
    <About class="mt-10" />
    <ProductSlider
      :name="'Yeni Gelenler'"
      :products="latestProducts"
      class="mt-10"
    />
    <PopularCategory class="mt-10" />
    <ProductSlider
      :name="'Popüler Ürünler '"
      :products="bestSellers"
      class="mt-10"
    />
    <OurMission id="mission" class="mt-10" />
  </div>
</template>

<script>
import Hero from "../components/Menu/Hero.vue";
import About from "../components/About.vue";
import ProductSlider from "../components/ProductSlider.vue";
import LogoSlider from "../components/LogoSlider.vue";
import PopularCategory from "../components/PopularCategory.vue";
import OurMission from "../components/OurMission.vue";

import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

export default {
  data() {
    return {
      bestSellers: [],
      popular: [],
      latestProducts: [],
      loading: true,
    };
  },

  components: {
    LogoSlider,
    About,
    ProductSlider,
    PopularCategory,
    OurMission,
    Hero,
  },

  async mounted() {
    const db = getFirestore();

    // Get New Arrival Products
    const productsRef = collection(db, "products");
    const latestProductsQuery = query(
      productsRef,
      orderBy("created_date", "asc"),
      limit(12)
    );
    const latestProductsSnapshot = await getDocs(latestProductsQuery);
    latestProductsSnapshot.forEach(async (product) => {
      this.latestProducts.push(product.data());
    });
    //>

    // Get Best Seller Products
    const bestSelProductsQuery = query(
      productsRef,
      orderBy("created_date", "asc"),
      limit(12)
    );
    const bestSelProductsSnapshot = await getDocs(bestSelProductsQuery);
    bestSelProductsSnapshot.forEach((product) => {
      this.bestSellers.push(product.data());
    });
    //>
  },
};
</script>
