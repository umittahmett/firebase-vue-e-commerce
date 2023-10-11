<template>
  <div></div>
</template>

<script>
import { LockClosedIcon, XMarkIcon } from "@heroicons/vue/20/solid";
import Button from "../Common/Button.vue";
import "animate.css";
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      menuToggle: false,
      barcodeId: null,
      pages: [
        { name: "Anasayfa", href: "/" },
        { name: "Ürün Ekle", href: "/add_product" },
        { name: "Yeni Ürün Oluştur", href: "/create_new_product" },
      ],
    };
  },
  components: {
    Button,
    LockClosedIcon,
    XMarkIcon,
    RouterLink,
  },
};
</script>
