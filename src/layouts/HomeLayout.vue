<template>
  <div class="w-full">
    <Hero />
    <router-view class="w-full mt-10" />
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
