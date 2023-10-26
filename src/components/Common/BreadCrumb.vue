<template>
  <div class="card flex justify-content-center text-gray-400 border-b w-fit">
    <Breadcrumb :home="home" :model="items">
      <template #item="{ label, item, props }">
        <a v-if="item.route" :href="item.route" custom>
          <i class="pi pi-home text-xl mr-1"></i>
        </a>
        <a
          v-else
          :href="item.url"
          :target="item.target"
          v-bind="props.action"
          class="sm:px-2 !text-gray-300"
        >
          <span class="!text-gray-400" v-if="item.icon" v-bind="props.icon" />
          <span class="!text-gray-400" v-bind="props.label">{{ label }}</span>
        </a>
      </template>
    </Breadcrumb>
  </div>
</template>

<script>
import Breadcrumb from "primevue/breadcrumb";

export default {
  data() {
    return {
      home: {
        icon: "pi pi-home",
        route: "/",
      },
      items: [
        { label: "Home", url: "/" },
        { label: "Computers", url: "/" },
      ],
    };
  },

  components: {
    Breadcrumb,
  },
};
</script>
