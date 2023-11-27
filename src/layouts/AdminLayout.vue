<template>
  <!-- Admin Layout -->
  <div class="w-full">
    <Navbar />

    <router-view class="w-full mt-10" />
  </div>
</template>

<script>
import Hero from "../components/Menu/Hero.vue";
import Navbar from "../components/Menu/AdminNavbar.vue";

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
