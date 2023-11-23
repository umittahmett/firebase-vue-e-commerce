<template>
  <div class="w-full">
    <Navbar />
    <router-view class="w-full" />
    <Footer />
  </div>
</template>

<script>
import Navbar from "../components/Menu/Navbar.vue";
import Footer from "../components/Footer.vue";

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
