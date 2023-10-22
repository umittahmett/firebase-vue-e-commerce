<template>
  <div class="w-full">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "../src/components/Menu/Navbar.vue";

export default {
  data() {
    return {};
  },
  components: {
    Navbar,
  },
};
</script>
