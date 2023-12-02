<!-- Feedback Message -->
<template>
  <div class="fixed top-12 right-3 max-w-[400px]">
    <Message
      v-if="store && store.feedBackMessageVisible"
      :severity="messageType"
      >{{ text }}</Message
    >
  </div>
</template>

<script>
import Message from "primevue/message";
import { createWizardStore } from "../../stores/counter";

export default {
  components: {
    Message,
  },

  data() {
    return {
      store: null,
    };
  },
  props: {
    text: {
      type: String,
      default: null,
    },
    messageType: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    this.store = createWizardStore();
  },
};
</script>
