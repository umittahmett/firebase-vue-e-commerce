<template>
  <div class="max-w-7xl w-full mx-auto py-5 px-3">
    <BreadCrumb />
    <div class="flex items-start flex-col lg:flex-row justify-between gap-10 mt-5">
      <div class="card bg-[#f4f4f4] max-w-[610px]  relative max-lg:mx-auto">
        <Galleria
          :value="product.images"
          :responsiveOptions="responsiveOptions"
          :numVisible="5"
          :circular="true"
          :showItemNavigators="true"
        >
          <template #item="slotProps">
            <div class=" w-full sm:w-[610px] h-[320px] sm:h-[500px] overflow-hidden  flex justify-center items-center">
              <img
                class="object-cover bg-center overflow-hidden"
                :src="slotProps.item.itemImageSrc"
                :alt="slotProps.item.alt"
                style="width: 100%;  display: block"
              />
            </div>
          </template>

          <template #thumbnail="slotProps">
            <img
            class="object-cover bg-center w-[100px] h-[100px] "
              :src="slotProps.item.thumbnailImageSrc"
              :alt="slotProps.item.alt"
              style="display: block"
            />
          </template>
        </Galleria>
        <Sale v-if="product.discount"/>
      </div>
      <div class="text-start w-full mt-10">
        <h2 class="text-4xl">{{ product.name }}</h2>

        <p class="mt-3 text-gray-700 font-light text-xl flex items-center gap-x-1 ">
           <div class="flex items-center gap-1 justify-center ">
            <div v-if="product.discount" class="">
             <p class="text-gray-600 line-through text-base ">{{ product.price }}&#8378;</p> 
            </div>

            {{ product.discount ? product.price - product.price/100 * product.discount :product.price }}&#8378;
           </div>
          </p>

        <p class="mt-3">{{ product.description }}</p>

        <p class="text-gray-600 mt-3 border-b pb-2 " >{{ product.stock }} in stock</p>

        <p class="mt-3 font-bold">Category: <span class="text-gray-600 font-normal"> {{ product.category }}</span></p>

        <p class="font-bold mt-6">Contact:</p>

        <div class="flex justify-start items-center gap-5">
          <div>
            <p class="text-gray-400 text-sm pl-1 mt-1">5527273780</p>
            <a class="px-6 py-3 bg-green-500 rounded-xl text-white flex items-center gap-2"  href="https://wa.me/05527273780">
            <img class="w-8 h-8 rounded-md" src="/public/Logos/wp.png" alt="">
            Whatsaspp 
          </a>
          </div>

         <div>
          <p class="text-gray-400 text-sm pl-1 mt-1">5527273780</p>

          <a class="px-6 py-3 bg-blue-500 rounded-xl text-white flex items-center gap-2"  href="tel:+905527273780">
            <img class="w-8 h-8 rounded-md" src="/public/Logos/phone.png" alt="">
            Phone 
          </a>
         </div>
        </div>
      </div>
    </div>

    <!-- Features -->
    <h2 class="text-3xl border-b text-start mt-10 pb-2 mb-2 ">Product Features</h2>

    <div class="flex items-center justify-start gap-2 py-2 mt-1 pl-2 border-b border-l-blue-500 border-l-2" v-for="feature in product.features" :key="feature.name">
      <p class="font-medium ">{{ feature.feature_name }}:</p>
      <p class="text-gray-500">{{ feature.feature }} {{ feature.feature_unit_name }}</p>
    </div>



    <RelatedProducts class="mt-20"/>
    
  </div>
</template>

<script>
import Galleria from "primevue/galleria";
import BreadCrumb from "../components/Common/BreadCrumb.vue";
import Sale from "../components/Common/Sale.vue";
import RelatedProducts from '../components/RelatedProducts.vue'

export default {
  data() {
    return {
      product: {

        id: 109,
        name: "Asus",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit.Lorem ipsum dolor sit amet consectetur adipiscing elit.Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        price: 999.99,
        discount: 20,
        stock: 20,
        category: "Laptop",
        type_id: 3,
        features:[  
        {
          products_type_feature_id: 77,
          feature_name: "Ekran Boyutu",
          feature_unit_name: "inç",
          feature: "13.3"
        },
        {
          products_type_feature_id: 78,
          feature_name: "Çözünürlük",
          feature_unit_name: "",
          feature: "2560 x 1600"
        },
        {
          products_type_feature_id: 79,
          feature_name: "Panel Türü",
          feature_unit_name: "",
          feature: "IPS Retina"
        },
        {
          products_type_feature_id: 80,
          feature_name: "Yenileme Hızı",
          feature_unit_name: "Hz",
          feature: "60"
        },
        {
          products_type_feature_id: 81,
          feature_name: "Tepki Süresi",
          feature_unit_name: "ms",
          feature: "5"
        },
        {
          products_type_feature_id: 82,
          feature_name: "Bağlantı Noktaları",
          feature_unit_name: "",
          feature: "2 x Thunderbolt 4 (USB-C), 3.5mm kulaklık girişi"
        },
        {
          products_type_feature_id: 83,
          feature_name: "Hoparlörler",
          feature_unit_name: "",
          feature: "Stereo hoparlörler"
        },
        {
          products_type_feature_id: 84,
          feature_name: "VESA Montajı",
          feature_unit_name: "",
          feature: "Desteklenmiyor"
        },
        {
          products_type_feature_id: 85,
          feature_name: "Enerji Tüketimi",
          feature_unit_name: "Watt",
          feature: "65"
        }]

,

        images: [
          {
            itemImageSrc: "/public/example/pc.png",
            thumbnailImageSrc: "/public/example/pc.png",
            alt: "Image 1",
          },
          {
            itemImageSrc: "/public/example/img2.webp",
            thumbnailImageSrc: "/public/example/img2.webp",
            alt: "Image 2",
          },
          {
            itemImageSrc: "/public/example/img3.webp",
            thumbnailImageSrc: "/public/example/img3.webp",
            alt: "Image 3",
          },
          {
            itemImageSrc: "/public/example/img1.webp",
            thumbnailImageSrc: "/public/example/img1.webp",
            alt: "Image 4",
          },
          {
            itemImageSrc: "/public/example/img2.webp",
            thumbnailImageSrc: "/public/example/img2.webp",
            alt: "Image 5",
          },
          {
            itemImageSrc: "/public/example/img3.webp",
            thumbnailImageSrc: "/public/example/img3.webp",
            alt: "Image 6",
          },
          {
            itemImageSrc: "/public/hero/herobg.jpg",
            thumbnailImageSrc: "/public/hero/herobg.jpg",
            alt: "Image 7",
          },
        ],
      },

      responsiveOptions: [
        {
          breakpoint: "991px",
          numVisible: 4,
        },

        {
          breakpoint: "575px",
          numVisible: 3,
        },
      ],
    };
  },
  components: {
    Galleria,
    BreadCrumb,
    Sale,
    RelatedProducts
  },
};
</script>
