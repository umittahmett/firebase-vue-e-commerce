import { createRouter, createWebHistory } from "vue-router";
import HomeLayout from "../layouts/HomeLayout.vue";
import HomeView from "../views/HomeView.vue";
import ProductOverview from "../views/ProductOverview.vue";
import Search from "../views/Search.vue";
import AddProduct from "../views/Admin/AddProduct.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "",
      component: HomeLayout,
      meta: { title: "Home page" },
      children: [
        {
          path: "",
          name: "",
          component: HomeView,
        },
      ],
    },

    {
      path: "/overview",
      name: "overview",
      component: ProductOverview,
    },

    {
      path: "/search",
      name: "search",
      component: Search,
    },

    {
      path: "/admin",
      name: "admin",
      component: AddProduct,
    },
  ],
});

export default router;
