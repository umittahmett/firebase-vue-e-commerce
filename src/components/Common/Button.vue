<template>
  <button
    :type="type"
    class="text-black bg-white py-3 px-6 text-md transition-all"
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
        " focus:!outline-none focus:!ring-0": this.buttonType === "link",
        " hover:text-white hover:bg-blue-600 ": this.buttonType === "white",
        " hover:!bg-blue-600 !text-white !bg-blue-500 rounded-md ":
          this.buttonType === "blue",
        "border text-white !bg-[rgba(0,0,0,0)] hover:text-blue-600  hover:border-blue-600 ":
          this.buttonType === "bordered",

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
