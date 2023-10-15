<template>
  <div
    class="rounded-full text-white font-bold p-2 flex justify-center items-center absolute top-[-10px] right-[-10px]"
    :class="{
      'bg-black': bgColor === 'black',
      'bg-blue-500': bgColor === 'blue',
    }"
  >
    indirimli!
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: "blue",
    },
  },
};
</script>
