<template>
  <div class="w-full">
    <Navbar />
    <router-view class="max-w-7xl mx-auto w-full mt-10 px-3" />
  </div>
</template>

<script>
import Navbar from "../components/Menu/Navbar.vue";

export default {
  data() {
    return {};
  },
  components: {
    Navbar,
  },
};
</script>
