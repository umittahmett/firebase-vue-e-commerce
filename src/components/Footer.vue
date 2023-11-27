<template>
  <!-- Footer -->
  <div class="w-full bg-[#F4F8FD] p-4 text-black pt-32 transition-opacity">
    <div class="max-w-7xl mx-auto w-full">
      <div
        class="flex flex-col md:flex-row gap-y-20 items-start place-items-start"
      >
        <div class="max-md:w-full">
          <!-- Logo -->
          <a href="/">
            <img
              class="max-sm:w-[140px] w-[200px] flex-shrink-0"
              src="/public/Logos/sckn.png"
              alt=""
            />
          </a>

          <p class="max-w-md mt-4 text-lg font-light">
            Seçkin Bilişim ve Güvenlik Sistemleri olarak IT Destek Hizmetleri,
            en son teknolojileri kullanarak, müşterilerimize kapsamlı bir hizmet
            sunmaktayız. Profesyonel ekibimiz ile sorunlarınızı özelleştirilmiş
            çözümler ile hızlı ve güvenli şekilde hizmet vermekteyiz.
          </p>
        </div>

        <!-- Menus -->
        <div
          class="w-full flex justify-start sm:flex-row sm:justify-around items-start place-items-start flex-col gap-y-10 gap-x-2"
        >
          <div
            v-for="menu in menus"
            :key="menu.title"
            class="text-start w-fit flex flex-col"
          >
            <h3 class="text-2xl font-medium text-blue-500">{{ menu.title }}</h3>

            <div v-for="select in menu.selects" :key="select.name" class="mt-4">
              <a
                :href="select.url"
                @click="
                  select.category_id &&
                    store &&
                    store.addSearchedCategory(category.id)
                "
              >
                <p
                  class="font-light text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {{ select.name }}
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div
        class="w-full text-start border-t border-[rgba(0,0,0,0.10)] mt-14 py-4 flex justify-between md:items-center items-start gap-4 flex-col md:flex-row"
      >
        <p class="text-gray-500 font-light">
          Seçkin Bilişim Copyright © 2023 Tüm hakları saklıdır.
        </p>

        <div class="flex items-center gap-2">
          <p class="text-gray-500 font-light">Created by</p>
          <a
            href="https://umitahmed.com"
            class="font-light text-blue-600 border-b-blue-600 border-b opacity-70"
          >
            umitahmed.com
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createWizardStore } from "../stores/counter";

export default {
  data() {
    return {
      store: null,

      menus: [
        {
          title: "Alışveriş",
          selects: [
            {
              name: "Laptop",
              url: "/search",
              category_id: "JKZiGCzf7P5eywfL58z6",
            },
            {
              name: "Bilgisayar",
              url: "/search",
              category_id: "wePgj231vYLejYG6D5Wt",
            },
            {
              name: "Tablet",
              url: "/search",
              category_id: "W3JKh6SICKwr3n6L7SC3",
            },
            {
              name: "Monitör",
              url: "/search",
              category_id: "BvmX2uncsNWy0UyP2Zir",
            },
          ],
        },

        {
          title: "Hakkımızda",
          selects: [
            { name: "Anasayfa", url: "/" },
            { name: "İletişim", url: "/contact" },
          ],
        },

        {
          title: "Destek Hattı",
          selects: [{ name: "info@seckinbilisim.com.tr", url: "" }],
        },
      ],
    };
  },

  mounted() {
    this.store = createWizardStore();
  },
};
</script>
