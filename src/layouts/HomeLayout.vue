<template>
  <!-- Home Layout -->
  <div class="w-full">
    <Navbar />

    <router-view class="w-full" />

    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import Navbar from "../components/Menu/Navbar.vue";

export default {
  components: {
    Footer,
    Navbar,
  },
};
</script>
