<template>
  <div>
    <LogoSlider />
    <About class="mt-10" />
    <BestSeller class="mt-10" />
    <PopularCategory class="mt-10" />
    <NewArrivals class="mt-10" />
    <OurMission id="mission" class="mt-10" />
    <Features />
  </div>
</template>

<script>
import About from "../components/About.vue";
import BestSeller from "../components/BestSeller.vue";
import LogoSlider from "../components/LogoSlider.vue";
import NewArrivals from "../components/NewArrivals.vue";
import PopularCategory from "../components/PopularCategory.vue";
import OurMission from "../components/OurMission.vue";
import Features from "../components/Features.vue";

export default {
  data() {
    return {};
  },
  components: {
    LogoSlider,
    About,
    BestSeller,
    PopularCategory,
    NewArrivals,
    OurMission,
    Features,
  },
};
</script>
