<template>
  <div>
    <LogoSlider class="mt-14" />
    <About />
    <BestSeller />
    <PopularCategory />
  </div>
</template>
<script>
import About from "../components/About.vue";
import BestSeller from "../components/BestSeller.vue";
import LogoSlider from "../components/LogoSlider.vue";
import PopularCategory from "../components/PopularCategory.vue";

export default {
  data() {
    return {};
  },
  components: { LogoSlider, About, BestSeller, PopularCategory },
};
</script>
