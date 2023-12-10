<template>
  <!-- Admin Layout -->
  <div class="w-full">
    <AdminNavbar />

    <router-view class="w-full mt-10" />
  </div>
</template>

<script>
import Hero from "../components/Menu/Hero.vue";
import AdminNavbar from "../components/Menu/AdminNavbar.vue";

export default {
  data() {
    return {};
  },
  components: {
    AdminNavbar,
    Hero,
  },
};
</script>
