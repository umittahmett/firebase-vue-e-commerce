<template>
  <!-- Navbar -->
  <div
    class="sm:px-10 mx-auto w-full bg-white p-4 flex justify-between items-center sticky top-0 left-0 z-50"
  >
    <div class="flex justify-start items-center gap-20">
      <!-- Logo -->
      <a href="/" class="text-2xl font-medium leading-6 tracking-wide">
        SEÇKIN <br />
        BILIŞIM
      </a>

      <!-- Nav -->
      <div
        class="justify-start text-gray-400 font-semibold gap-5 hidden lg:flex"
      >
        <div v-for="page in pages" :key="page.name">
          <button class="hover:text-blue-600 transition-colors">
            <router-link to="">{{ page.name }}</router-link>
          </button>
        </div>
      </div>
    </div>

    <button
      class="hover:text-blue-600 transition-colors text-gray-400 font-semibold hidden lg:block"
    >
      <router-link to="">Contact</router-link>
    </button>

    <button class="w-7 h-7">
      <img src="/navbar/bars.png" alt="" />
    </button>
  </div>

  <div v-if="condition"></div>
</template>

<script>
import "animate.css";

export default {
  data() {
    return {
      menuToggle: false,
      pages: [
        { name: "Sale", href: "/" },
        { name: "Shop", href: "/add_product" },
      ],
    };
  },
};
</script>
