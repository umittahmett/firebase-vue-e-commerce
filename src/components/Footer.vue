<template>
  <div
    class="w-full bg-[#F4F8FD] p-4 text-black pt-32 transition-opacity font-[Gilroy-Regular] mt-20"
  >
    <div class="max-w-7xl mx-auto w-full">
      <div
        class="flex flex-col md:flex-row gap-y-20 items-start place-items-start"
      >
        <div class="max-md:w-full">
          <h1 class="font-normal text-4xl">Seçkin Bilişim</h1>

          <p class="max-w-md mt-10 text-lg font-light">
            The advantage of hiring a workspace with us is that givees you
            comfortable service and all-around facilities.
          </p>
        </div>

        <div
          class="w-full flex justify-start sm:flex-row sm:justify-around items-start place-items-start flex-col gap-y-10 gap-x-2"
        >
          <div
            v-for="menu in menus"
            :key="menu.title"
            class="text-start w-fit flex flex-col"
          >
            <h3 class="text-2xl font-medium">{{ menu.title }}</h3>

            <div v-for="select in menu.selects" :key="select.name" class="mt-4">
              <router-link :to="select.url">
                <p
                  class="font-light text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {{ select.name }}
                </p>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div
        class="w-full text-start border-t border-[rgba(0,0,0,0.10)] mt-14 py-4 flex justify-between md:items-center items-start gap-4 flex-col md:flex-row"
      >
        <p class="text-gray-500 font-light">
          Seçkin Bilişim Copyright © 2023 All rights reserved
        </p>

        <a
          href="https://umitahmed.com"
          class="font-light text-blue-600 border-b-blue-600 border-b opacity-70"
        >
          Developer : Ümit Ahmed
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          title: "Shop",
          selects: [
            { name: "Laptop", url: "/laptops" },
            { name: "Computer", url: "/computers" },
            { name: "Phone", url: "/phones" },
          ],
        },

        {
          title: "About",
          selects: [
            { name: "Home", url: "/" },
            { name: "Contact", url: "/contact" },
            { name: "Our Mission", url: "#mission" },
          ],
        },

        {
          title: "Need Help?",
          selects: [
            { name: "My Account", url: "/account" },
            { name: "Cart", url: "/cart" },
            { name: "Shop", url: "/shop" },
          ],
        },
      ],
    };
  },
};
</script>
