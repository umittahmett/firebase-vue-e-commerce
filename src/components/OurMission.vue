<template>
  <div class="w-full bg-[url(/public/OurMissionBg.jpg)] text-white mt-20">
    <div
      class="flex justify-center items-center py-20 px-2 gap-10 min-h-[600px] h-full flex-col text-center bg-[rgba(0,0,0,0.3)]"
    >
      <h2 class="text-5xl font-bold">Our Mission</h2>

      <p class="max-w-5xl">
        At Seçkin Bilişim, our mission is to provide our customers with the best
        in quality electronics products, while also making a positive impact on
        the world. We believe that businesses have a responsibility to be
        sustainable and socially responsible, and we’re committed to doing our
        part.
      </p>

      <Button :buttonType="'white'">View Products</Button>
    </div>
  </div>
</template>

<script>
import Button from "./Common/Button.vue";
import { LockClosedIcon } from "@heroicons/vue/20/solid";

export default {
  data() {
    return {};
  },
  components: { Button, LockClosedIcon },
};
</script>
