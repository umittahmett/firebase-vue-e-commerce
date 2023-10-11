<template>
  <button
    :type="type"
    class="text-black bg-white hover:bg-blue-600 py-3 px-6 text-md transition-all"
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
    buttonType: {
      type: String,
      default: "",
    },
    roundSize: {
      type: Number,
      default: 0,
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
        " bg-white hover:text-white ": this.buttonType === "white",

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
