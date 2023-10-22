<template>
  <div class="max-w-7xl mx-auto py-10">
    <Galleria
      :value="images"
      :responsiveOptions="responsiveOptions"
      :numVisible="5"
      :circular="true"
      containerStyle="max-width: 630px"
      :showItemNavigators="true"
    >
      <template #item="slotProps">
        <div class="w-[600px] h-[500px] flex justify-center items-center">
          <img
            class="w-full bg-cover"
            :src="slotProps.item.itemImageSrc"
            :alt="slotProps.item.alt"
            style="width: 100%; display: block"
          />
        </div>
      </template>
      <template #thumbnail="slotProps">
        <img
          class="w-[130px] h-[100px] bg-center object-cover"
          :src="slotProps.item.thumbnailImageSrc"
          :alt="slotProps.item.alt"
          style="display: block"
        />
      </template>
    </Galleria>
  </div>
</template>

<script>
import Galleria from "primevue/galleria";

export default {
  name: "MainSlider",
  components: {
    Galleria,
  },
  data() {
    return {
      images: [
        {
          itemImageSrc: "/public/about.png",
          thumbnailImageSrc: "/public/about.png",
          alt: "Image 1",
        },
        {
          itemImageSrc: "/public/OurMissionBg.jpg",
          thumbnailImageSrc: "/public/OurMissionBg.jpg",
          alt: "Image 2",
        },
        {
          itemImageSrc: "/public/about.png",
          thumbnailImageSrc: "/public/about.png",
          alt: "Image 1",
        },
        {
          itemImageSrc: "/public/OurMissionBg.jpg",
          thumbnailImageSrc: "/public/OurMissionBg.jpg",
          alt: "Image 2",
        },
        {
          itemImageSrc: "/public/about.png",
          thumbnailImageSrc: "/public/about.png",
          alt: "Image 1",
        },
        {
          itemImageSrc: "/public/OurMissionBg.jpg",
          thumbnailImageSrc: "/public/OurMissionBg.jpg",
          alt: "Image 2",
        },
      ],
      responsiveOptions: [
        {
          breakpoint: "1080px",
          numVisible: 5,
        },
        {
          breakpoint: "768px",
          numVisible: 3,
        },
        {
          breakpoint: "560px",
          numVisible: 1,
        },
      ],
    };
  },
  galleriaService: null,
};
</script>
