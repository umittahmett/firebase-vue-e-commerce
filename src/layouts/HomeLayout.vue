<template>
  <div class="w-full">
    <Navbar />
    <Hero />
    <router-view class="max-w-7xl mx-auto w-full mt-10 px-3" />
  </div>
</template>

<script>
import Hero from "../components/Menu/Hero.vue";
import Navbar from "../components/Menu/Navbar.vue";

export default {
  data() {
    return {};
  },
  components: {
    Navbar,
    Hero,
  },
};
</script>
