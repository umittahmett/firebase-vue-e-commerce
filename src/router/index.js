import { createRouter, createWebHistory } from "vue-router";
import HomeLayout from "../layouts/HomeLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import HomeView from "../views/HomeView.vue";
import ProductOverview from "../views/ProductOverview.vue";
import Search from "../views/Search.vue";
import Page404 from "../views/Page404.vue";
import Login from "../components/Auth/Login.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
          path: "/",
          name: "",
          component: HomeView,
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
      ],
    },

    {
      path: "/login",
      name: "login",
      component: Login,
    },

    {
      path: "/lorem-seckn_bil-admin",
      name: "Admin",
      component: () => import("../layouts/AdminLayout.vue"),
      children: [
        {
          path: "",
          name: "",
          component: () => import("../views/Admin/Home.vue"),
          meta: {
            authRequired: true,
          },
        },

        {
          path: "update-product",
          name: "update-product",
          component: () => import("../views/Admin/UpdateProduct.vue"),
          meta: {
            authRequired: true,
          },
        },

        {
          path: "add-reference",
          name: "add-reference",
          component: () => import("../views/Admin/AddReference.vue"),
          meta: {
            authRequired: true,
          },
        },

        {
          path: "add-category",
          name: "add-category",
          component: () => import("../views/Admin/AddCategory.vue"),
          meta: {
            authRequired: true,
          },
        },

        {
          path: "add-product",
          name: "add-product",
          component: () => import("../views/Admin/AddProduct.vue"),
          meta: {
            authRequired: true,
          },
        },
      ],

      meta: {
        authRequired: true,
      },
    },

    {
      path: "/:catchAll(.*)",
      component: Page404,
    },
  ],
});

// Authentication Control
router.beforeEach((to, from, next) => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (to.matched.some((record) => record.meta.authRequired)) {
      if (user) {
        next();
      } else {
        alert("Bu sayfayı görmek için giriş yapmalısınız");
        next({
          path: "/",
        });
      }
    } else {
      next();
    }
  });
});

export default router;
