<template>
  <button
    :type="type"
    class="flex justify-center gap-x-2 px-4 py-2 text-xs font-medium leading-6 text-white align-middle transition-all duration-200 ease-in-out shadow-sm bg-sky-400 hover:bg-sky-300 md:text-sm focus:ring-1 focus:ring-inset focus:ring-sky-600"
    :class="computedClasses"
    :disabled="disabled"
  >
    {{ text }}
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "submit",
    },
    buttonType: {
      type: String,
      default: "",
    },
    roundSize: {
      type: Number,
      default: 3,
    },
    customClass: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    computedClasses() {
      return {
        // custom button types
        "!border-none !p-0 bg-transparent focus:!outline-none focus:!ring-0 !text-sky-500 hover:bg-transparent !shadow-none hover:underline ":
          this.buttonType === "link",
        "!text-gray-600 bg-white hover:bg-gray-100 border border-gray-300 hover:text-gray-500":
          this.buttonType === "white",

        // rounded classes
        "rounded-sm": this.roundSize === 1,
        "rounded-md": this.roundSize === 2,
        "rounded-lg": this.roundSize === 3,
        "rounded-xl": this.roundSize === 4,
        "rounded-full": this.roundSize === 5,

        // bind custom class
        [this.customClass]: true,
        "opacity-30": this.disabled,
      };
    },
  },
  methods: {
    onClick(event) {
      this.$emit("onClick", event);
    },
  },
};
</script>
