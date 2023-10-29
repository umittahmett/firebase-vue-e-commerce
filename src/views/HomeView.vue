<template>
  <div>
    <LogoSlider />
    <About class="mt-10" />
    <ProductSlider
      :name="'Yeni Gelenler'"
      :products="newArrvals"
      class="mt-10"
    />
    <PopularCategory class="mt-10" />
    <ProductSlider
      :name="'En Cok Satanlar'"
      :products="pupolar"
      class="mt-10"
    />
    <OurMission id="mission" class="mt-10" />
    <Features />
  </div>
</template>

<script>
import About from "../components/About.vue";
import ProductSlider from "../components/ProductSlider.vue";
import LogoSlider from "../components/LogoSlider.vue";
import PopularCategory from "../components/PopularCategory.vue";
import OurMission from "../components/OurMission.vue";
import Features from "../components/Features.vue";

export default {
  data() {
    return {
      newArrvals: [
        {
          name: "Asus",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          price: 999.99,
          discount: 20,
          image: "/example/pc.png",
        },
        {
          name: "Iphone 12s",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.ipsum dolor sit amet consectetur adipiscing elit.",
          price: 499.99,
          discount: 0,
          image: "/example/pc.png",
        },

        {
          name: "Asus",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          price: 999.99,
          discount: 20,
          image: "/example/pc.png",
        },
        {
          name: "Iphone 12s",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.ipsum dolor sit amet consectetur adipiscing elit.",
          price: 499.99,
          discount: 0,
          image: "/example/pc.png",
        },
        {
          name: "Asus",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          price: 999.99,
          discount: 20,
          image: "/example/pc.png",
        },
        {
          name: "Iphone 12s",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.ipsum dolor sit amet consectetur adipiscing elit.",
          price: 499.99,
          discount: 0,
          image: "/example/pc.png",
        },

        {
          name: "MSI",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          price: 1299.99,
          discount: 10,
          image: "/example/pc.png",
        },

        {
          name: "MSI",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          price: 1299.99,
          discount: 10,
          image: "/example/pc.png",
        },
      ],

      pupolar: [
        {
          name: "Asus",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          price: 999.99,
          discount: 20,
          image: "/example/pc.png",
        },
        {
          name: "Iphone 12s",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.ipsum dolor sit amet consectetur adipiscing elit.",
          price: 499.99,
          discount: 0,
          image: "/example/pc.png",
        },

        {
          name: "Asus",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          price: 999.99,
          discount: 20,
          image: "/example/pc.png",
        },
        {
          name: "Iphone 12s",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.ipsum dolor sit amet consectetur adipiscing elit.",
          price: 499.99,
          discount: 0,
          image: "/example/pc.png",
        },
        {
          name: "Asus",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          price: 999.99,
          discount: 20,
          image: "/example/pc.png",
        },
        {
          name: "Iphone 12s",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.ipsum dolor sit amet consectetur adipiscing elit.",
          price: 499.99,
          discount: 0,
          image: "/example/pc.png",
        },

        {
          name: "MSI",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          price: 1299.99,
          discount: 10,
          image: "/example/pc.png",
        },

        {
          name: "MSI",
          description:
            "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
          price: 1299.99,
          discount: 10,
          image: "/example/pc.png",
        },
      ],
    };
  },
  components: {
    LogoSlider,
    About,
    ProductSlider,
    PopularCategory,
    OurMission,
    Features,
  },
};
</script>
