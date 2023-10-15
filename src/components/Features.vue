<template>
  <div
    class="flex justify-around items-center flex-col md:flex-row max-w-7xl gap-y-4 mx-auto border-b-gray-400 md:border-b py-10"
  >
    <div class="flex justify-center items-center gap-4 border-r-black py-2">
      <LockClosedIcon class="w-8 h-8 text-blue-600" />
      <p class="font-medium text-xl">Secure Payment</p>
    </div>

    <div class="h-px w-full max-md:mx-auto md:h-8 bg-gray-400 md:w-[1px]"></div>

    <div class="flex justify-center items-center gap-4 border-r-black py-2">
      <LockClosedIcon class="w-8 h-8 text-blue-600" />
      <p class="font-medium text-xl">Secure Payment</p>
    </div>

    <div class="h-px w-full max-md:mx-auto md:h-8 bg-gray-400 md:w-[1px]"></div>

    <div class="flex justify-center items-center gap-4 border-r-black py-2">
      <LockClosedIcon class="w-8 h-8 text-blue-600" />
      <p class="font-medium text-xl">Secure Payment</p>
    </div>

    <div
      class="max-md:block hidden h-px w-full max-md:mx-auto md:h-8 bg-gray-400 md:w-[1px]"
    ></div>
  </div>
</template>

<script>
import { LockClosedIcon } from "@heroicons/vue/20/solid";
import {} from "@heroicons/vue/20/solid";

export default {
  data() {
    return {};
  },
  components: { LockClosedIcon },
};
</script>
