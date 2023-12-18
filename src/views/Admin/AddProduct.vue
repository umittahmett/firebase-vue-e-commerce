<template>
  <div
    class="w-full bg-gray-100"
    :class="{
      'opacity-50': loading === true,
    }"
  >
    <div
      class="w-full max-w-7xl mx-auto bg-gray-100 px-3 py-10 flex justify-between gap-10"
    >
      <div class="w-full max-w-[400px]">
        <!-- Category -->
        <p class="font-light">Kategori</p>
        <Dropdown
          v-model="selectedCategory"
          :options="categories"
          optionLabel="name"
          @change="getFeaturesTypes"
          placeholder="Kategori Seç"
          class="w-full md:w-14rem max-w-[400px]"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div>
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </Dropdown>

        <!-- Brand -->
        <p class="font-light mt-4">Marka</p>
        <Dropdown
          editable
          v-model="selectedBrand"
          :options="brands"
          optionLabel="name"
          placeholder="Marka Seç"
          class="w-full md:w-14rem max-w-[400px]"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div>
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </Dropdown>

        <!-- Model  -->
        <p class="font-light mt-4">Model</p>
        <InputText
          class="w-full max-w-[400px] p-2.5"
          type="text"
          v-model="productModel"
          placeholder="Model Gir"
        />

        <!-- Title  -->
        <p class="font-light mt-4">Başlık</p>
        <InputText
          class="w-full max-w-[400px] p-2.5"
          type="text"
          v-model="title"
          placeholder="Başlık Gir"
        />

        <!-- Description  -->
        <p class="font-light mt-4">Açıklama</p>
        <Textarea
          class="w-full max-w-[400px] p-2.5"
          placeholder="Açıklama Gir"
          v-model="description"
          rows="5"
          cols="30"
        />

        <!-- Price  -->
        <p class="font-light mt-4">Fiyat</p>
        <InputNumber
          class="w-full max-w-[400px]"
          placeholder="Fiyat Gir"
          v-model="price"
          inputId="currency-us"
          mode="currency"
          currency="TRY"
          locale="tr"
        />

        <!-- Discount  -->
        <p class="font-light mt-4">İndirim</p>
        <InputNumber
          class="w-full max-w-[400px]"
          placeholder="İndirim Gir"
          v-model="discount"
          inputId="percent"
          prefix="%"
        />
      </div>

      <!-- Featuress -->
      <div class="h-fit w-full">
        <div v-if="featureTypes" class="grid grid-cols-3 gap-8">
          <!-- Feature -->
          <div
            v-for="featureType in featureTypes"
            :key="featureType.id"
            class="w-full max-w-[400px] h-fit"
          >
            <p class="font-light">{{ featureType.name }}</p>
            <div class="w-full relative">
              <InputText
                class="w-full p-2.5"
                type="text"
                v-model="featureType.feature"
                :placeholder="featureType.name"
              />
              <p class="absolute right-2.5 top-2.5 text-gray-400">
                {{ featureType.unit_name }}
              </p>
            </div>
          </div>
        </div>

        <!-- Upload Images -->
        <div class="card mt-4">
          <p class="font-light">Ürün Fotoğrafları Yükle</p>
          <FileUpload
            ref="fileUploadRef"
            :customUpload="true"
            :multiple="true"
            accept="image/*"
            :maxFileSize="1000000"
          >
            <template #empty>
              <p>Drag and drop files to here to upload.</p>
            </template>
          </FileUpload>
        </div>

        <!-- Save -->
        <div class="mt-6">
          <Button
            class="bg-[#10b981] text-white px-5 p-2.5"
            label="Kaydet"
            @click="alertPopupVivible = true"
          />

          <!-- Alert Popup -->
          <Dialog
            id="dlg"
            header="Uyarı"
            v-model:visible="alertPopupVivible"
            :style="{ width: '30vw' }"
            class="text-center"
          >
            <p>Ürünü Kaydetmek İstiyor musunuz ?</p>
            <div class="flex justify-center items-center mt-4 gap-4">
              <Button
                class="bg-[#10b981] text-white px-5 p-2.5"
                label="Kaydet"
                @click="saveProductHead"
              />

              <Button
                class="bg-red-300 p-2.5"
                label="İptal Et"
                @click="alertPopupVivible = false"
              />
            </div>
          </Dialog>
        </div>

        <!-- Feedback Messages -->
        <div class="fixed top-5 right-5 max-w-sm">
          <Message :hidden="!succesMessage" severity="success"
            >Başarılı
          </Message>

          <Message :hidden="!errorMessage" severity="error"
            >Bir Şeyler Ters Gitti
          </Message>

          <Message :hidden="!warnMessage" severity="warn"
            >Lütfen Kutuları Eksiksiz Doldurun
          </Message>
        </div>

        <div
          v-if="loading"
          class="text-center fixed top-0 left-0 w-full h-full flex justify-center items-center"
        >
          <ProgressSpinner class="w-24 h-24" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from "primevue/fileupload";
import Toast from "primevue/toast";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import ConfirmPopup from "primevue/confirmpopup";
import Textarea from "primevue/textarea";
import InputNumber from "primevue/inputnumber";
import Dialog from "primevue/dialog";
import Message from "primevue/message";
import ProgressSpinner from "primevue/progressspinner";

import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  doc,
  addDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

export default {
  components: {
    FileUpload,
    Toast,
    Button,
    Dropdown,
    InputText,
    Textarea,
    InputNumber,
    ConfirmPopup,
    Dialog,
    Message,
    ProgressSpinner,
  },
  data() {
    return {
      loading: false,
      imageUrls: [],
      selectedCategory: null,
      categories: [],
      selectedBrand: null,
      brands: [],
      productModel: null,
      title: null,
      description: null,
      price: null,
      discount: null,
      alertPopupVivible: false,
      succesMessage: false,
      errorMessage: false,
      warnMessage: false,
      featureTypes: [],
      features: null,
    };
  },
  methods: {
    async saveProductHead() {
      this.loading = true;

      if (
        (this.selectedBrand,
        this.selectedCategory,
        this.productModel,
        this.title,
        this.description,
        this.price)
      ) {
        this.alertPopupVivible = false;
        this.succesMessage = true;

        try {
          const db = getFirestore();
          const storage = getStorage();

          // Add new Brand
          if (this.selectedBrand && typeof this.selectedBrand === "string") {
            const brandsCollection = collection(db, "brands");
            const newBrand = await addDoc(brandsCollection, {
              name: this.selectedBrand,
            });

            const updatedBrandDoc = doc(db, "brands", newBrand.id);

            await updateDoc(updatedBrandDoc, { id: newBrand.id });
          }

          const productsCollection = collection(db, "products");
          const now = new Date();
          const timestamp = {
            seconds: Math.floor(now.getTime() / 1000),
            nanoseconds: now.getMilliseconds() * 1000000,
          };

          // Get Global Category Name
          let globalCategoryName = "";
          const globalCategoryDocRef = doc(
            db,
            "global_categories",
            this.selectedCategory.global_category_id
          );

          const globalCategoryDoc = await getDoc(globalCategoryDocRef);

          if (globalCategoryDoc.exists()) {
            globalCategoryName = globalCategoryDoc.data().name;
            console.log(globalCategoryName);
          } else {
            console.log("Belirtilen belge bulunamadı.");
          }

          // New Product Data
          const newProductData = {
            category_id: this.selectedCategory.id,
            category_name: this.selectedCategory.name,
            global_category_name: globalCategoryName,
            brand:
              typeof this.selectedBrand === "string"
                ? this.selectedBrand
                : this.selectedBrand.name,
            model: this.productModel,
            title: this.title,
            description: this.description,
            price: this.price,
            discount: this.discount,
            created_date: timestamp,
          };

          const docRef = await addDoc(productsCollection, newProductData);
          const updatedProductDoc = doc(db, "products", docRef.id);

          const products_featuresCollection = collection(
            db,
            "products_features"
          );

          // Add Features
          this.featureTypes.forEach(async (feature) => {
            const newFeature = {
              id: "",
              product_category_feature_id: feature.id,
              product_id: docRef.id,
              unit_value: feature.feature,
            };

            const featureDocRef = await addDoc(
              products_featuresCollection,
              newFeature
            );

            const updatedFeatureDoc = doc(
              db,
              "products_features",
              featureDocRef.id
            );

            const addFeatureId = {
              id: featureDocRef.id,
            };

            await updateDoc(updatedFeatureDoc, addFeatureId);
          });

          // Add Images
          if (
            this.$refs.fileUploadRef.files &&
            this.$refs.fileUploadRef.files.length > 0
          ) {
            for (const file of this.$refs.fileUploadRef.files) {
              const storageRef = ref(
                storage,
                `products_images/product_${docRef.id}/${Date.now()}_${
                  file.name
                }`
              );

              try {
                // Dosyayı Firebase Storage'a yükleyin
                await uploadBytes(storageRef, file);

                // Dosyanın URL'sini alın
                const url = await getDownloadURL(storageRef);

                // URL'yi imageUrls dizisine ekleyin
                this.imageUrls.push(url);
              } catch (error) {
                console.error("Dosya yükleme hatası: ", error);
              }
            }
          } else {
            // Eğer dosya yoksa, proje dosyasındaki bir fotoğrafı kullanın
            const filePath = "public/noImage.png"; // Fotoğrafın projedeki yolu
            const response = await fetch(filePath);
            const blob = await response.blob();

            const exampleStorageRef = ref(
              storage,
              `products_images/product_${docRef.id}/${Date.now()}_noImage`
            );

            try {
              // Dosyayı Firebase Storage'a yükleyin
              await uploadBytes(exampleStorageRef, blob);

              // Dosyanın URL'sini alın
              const exampleImageUrl = await getDownloadURL(exampleStorageRef);

              // URL'yi imageUrls dizisine ekleyin
              this.imageUrls.push(exampleImageUrl);
            } catch (error) {
              console.error("Dosya yükleme hatası: ", error);
            }
          }

          // Update Product
          const additionalData = {
            id: docRef.id,
            images_folder: "product_" + docRef.id,
            cover_image: this.imageUrls[0],
          };
          await updateDoc(updatedProductDoc, additionalData).then(() => {
            this.succesMessage = true;
            this.loading = false;
            window.location.reload();
          });
        } catch (error) {
          console.log(error);
          this.errorMessage = true;
          this.loading = false;
        }
      } else {
        console.log("kutulari eksiksiz doldurun");
        this.warnMessage = true;
      }
    },

    async getFeaturesTypes() {
      // Get Product Features
      this.featureTypes = [];
      const db = getFirestore();
      const featuresRef = collection(db, "product_cetegory_features");
      const featureQuery = query(
        featuresRef,
        where("category_id", "==", this.selectedCategory.id)
      );
      const featuresSnapshot = await getDocs(featureQuery);
      featuresSnapshot.forEach(async (feature) => {
        const featureData = {
          id: feature.id,
          name: feature.data().name,
          unit_name: feature.data().unit_name,
          feature: "",
        };

        this.featureTypes.push(featureData);
      });
      //>
    },
  },

  async mounted() {
    const db = getFirestore();
    // Get Categories
    const categoriesRef = collection(db, "categories");
    const categorySnapshot = await getDocs(categoriesRef);
    if (!categorySnapshot.empty) {
      const categories = categorySnapshot.docs;
      categories.forEach((category) => {
        this.categories.push(category.data());
      });
    } else {
      console.log("categories is empty");
    }

    // Get Brands
    const brandsRef = collection(db, "brands");
    const brandsSnapshot = await getDocs(brandsRef);
    if (!brandsSnapshot.empty) {
      const brands = brandsSnapshot.docs;
      brands.forEach((brand) => {
        this.brands.push(brand.data());
      });
    } else {
      console.log("categories is empty");
    }
  },
};
</script>
