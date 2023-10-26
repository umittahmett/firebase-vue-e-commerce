<template>
  <div class="w-full">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from "../src/components/Menu/Navbar.vue";
import Footer from "../src/components/Footer.vue";

export default {
  data() {
    return {};
  },
  components: {
    Navbar,
    Footer,
  },
};
</script>
