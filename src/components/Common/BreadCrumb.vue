<template>
  <div class="card flex justify-content-center text-gray-400 border-b w-fit">
    <Breadcrumb :home="home" :model="items">
      <template #item="{ label, item, props }">
        <a v-if="item.route" :href="item.route" custom>
          <i class="pi pi-home text-blue-500 text-xl mr-1"></i>
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
        { label: "Search", url: "/search" },
        { label: "", url: "/search" },
      ],
    };
  },

  components: {
    Breadcrumb,
  },

  mounted() {
    const searchedWordMethod = localStorage.getItem("searchedWord");
    const searchedCategoryMethod = localStorage.getItem("searchedCategory");

    const searchedWordJSON = searchedWordMethod
      ? JSON.parse(searchedWordMethod)
      : null;
    const searchedCategoryJSON = searchedCategoryMethod
      ? JSON.parse(searchedCategoryMethod)
      : null;

    let word = "";

    if (!searchedWordJSON && !searchedCategoryJSON) {
      word = "Bilgisayar";
    } else {
      if (searchedWordJSON && searchedCategoryJSON) {
        word =
          searchedWordJSON.addingDate > searchedCategoryJSON.addingDate
            ? searchedWordJSON.word
            : searchedCategoryJSON.category_name;
      } else if (!searchedWordJSON && searchedCategoryJSON) {
        word = searchedCategoryJSON.category_name;
      } else if (searchedWordJSON && !searchedCategoryJSON) {
        word = searchedWordJSON.word;
      }
    }

    const truncatedText = word.slice(0, 10);
    this.items[1].label =
      truncatedText.length > 6 ? truncatedText + ".." : truncatedText;
  },
};
</script>
