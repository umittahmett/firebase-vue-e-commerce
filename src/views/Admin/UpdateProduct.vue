<template>
  <!-- Update Product -->
  <div
    class="w-full bg-gray-100"
    :class="{
      'opacity-70': loading === true,
    }"
  >
    <div class="w-full max-w-7xl mx-auto bg-gray-100 py-10">
      <div class="px-3 flex justify-between gap-10">
        <div class="w-full max-w-[400px]">
          <!-- Brand -->
          <p class="font-light">Marka</p>
          <Dropdown
            editable
            v-model="product.brand"
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
            v-model="product.model"
            placeholder="Model Gir"
          />

          <!-- Title  -->
          <p class="font-light mt-4">Başlık</p>
          <InputText
            class="w-full max-w-[400px] p-2.5"
            type="text"
            v-model="product.title"
            placeholder="Başlık Gir"
          />

          <!-- Description  -->
          <p class="font-light mt-4">Açıklama</p>
          <Textarea
            class="w-full max-w-[400px] p-2.5"
            placeholder="Açıklama Gir"
            v-model="product.description"
            rows="5"
            cols="30"
          />

          <!-- Price  -->
          <p class="font-light mt-4">Fiyat</p>
          <InputNumber
            class="w-full max-w-[400px]"
            placeholder="Fiyat Gir"
            v-model="product.price"
            inputId="currency-us"
            mode="currency"
            currency="TRY"
            locale="tr"
          />

          <!-- Discounted Price -->
          <p v-if="product.discount" class="font-light mt-1 text-sm">
            indirimli fiyat :
            <span class="font-bold">
              {{
                product.price - (product.price * product.discount) / 100
              }}&#8378;</span
            >
          </p>

          <!-- Discount  -->
          <p class="font-light mt-4">İndirim</p>
          <InputNumber
            class="w-full max-w-[400px]"
            placeholder="İndirim Gir"
            v-model="product.discount"
            inputId="percent"
            prefix="%"
          />
        </div>

        <!-- Featuress -->
        <div class="h-fit w-full">
          <div v-if="product.features" class="grid grid-cols-3 gap-8">
            <!-- Feature -->
            <div
              v-for="feature in product.features"
              :key="feature"
              class="w-full max-w-[400px] h-fit"
            >
              <p class="font-light">{{ feature.name }}</p>
              <div class="w-full relative">
                <InputText
                  class="w-full p-2.5"
                  type="text"
                  v-model="feature.unit_value"
                  :placeholder="feature.name"
                />
                <p class="absolute right-2.5 top-2.5 text-gray-400">
                  {{ feature.unit_name }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-4">
        <!-- Add New Images -->
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

        <!-- Rule Images -->
        <p class="font-light mt-10">Fotoğraflar</p>
        <div class="flex items-center justify-start flex-wrap gap-8 mt-8">
          <div
            class="relative w-[100px] rounded-xl h-[100px] border-[#10b981] border-2"
            :class="{
              'border-[#f86060]': image.deleteImage === true,
            }"
            v-for="image in product.images"
            :key="image"
          >
            <img
              class="h-[100px] w-[100px] p-1 object-contain rounded-xl"
              :src="image.url"
              alt=""
            />

            <Button
              @click="selectDeleteImage(image.url)"
              :icon="image.deleteImage === true ? 'pi pi-times' : 'pi pi-check'"
              severity="danger"
              rounded
              aria-label="Cancel"
              class="absolute top-[-20px] right-[-20px] bg-[#10b981] text-white"
              :class="{
                'bg-[#f86060]': image.deleteImage === true,
              }"
            />
          </div>
        </div>
      </div>

      <!-- Save -->
      <div class="mt-10">
        <Button
          class="bg-[#10b981] text-white px-5 p-2.5"
          label="Kaydet"
          @click="
            (popupData = {
              text: 'Değişiklikleri Kaydetmek İstiyor Musunuz?',
              buttonText: 'Kaydet',
              action: saveProduct,
            }),
              (alertPopupVivible = true)
          "
        />

        <Button
          class="bg-[#f86060] text-white px-5 p-2.5 ml-2"
          label="Ürünü Kaldır"
          @click="
            (popupData = {
              text: 'Ürünü Kaldırmak İstediğinizden Emin Eisiniz?',
              buttonText: 'Kaldir',
              action: deleteProduct,
            }),
              (alertPopupVivible = true)
          "
        />

        <!-- Alert Popup -->
        <Dialog
          id="dlg"
          header="Uyarı"
          v-model:visible="alertPopupVivible"
          :style="{ width: '30vw' }"
          class="text-center"
        >
          <p>{{ popupData.text }}</p>
          <div class="flex justify-center items-center mt-4 gap-4">
            <Button
              class="bg-[#10b981] text-white px-5 p-2.5"
              :label="popupData.buttonText"
              @click="popupData.action()"
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
        <Message :hidden="!succesMessage" severity="success">Başarılı </Message>

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
</template>

<script>
import Galleria from "primevue/galleria";
import ProgressSpinner from "primevue/progressspinner";
import { XMarkIcon } from "@heroicons/vue/20/solid";
import Button from "primevue/button";
import FileUpload from "primevue/fileupload";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import ConfirmPopup from "primevue/confirmpopup";
import Textarea from "primevue/textarea";
import Dialog from "primevue/dialog";
import Message from "primevue/message";

import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  getDownloadURL,
  listAll,
  deleteObject,
  uploadBytes,
} from "firebase/storage";

export default {
  components: {
    Galleria,
    ProgressSpinner,
    XMarkIcon,
    Button,
    FileUpload,
    Button,
    Dropdown,
    InputText,
    Textarea,
    InputNumber,
    ConfirmPopup,
    Dialog,
    Message,
  },

  data() {
    return {
      product: {},
      productCopy: {},
      similarProducts: [],
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
      popupText: "",
      similarProductsEmpty: false,
      fullscreenView: false,
      brands: [],
      loading: false,
      alertPopupVivible: false,
      succesMessage: false,
      errorMessage: false,
      warnMessage: false,
      popupData: {},
    };
  },

  methods: {
    selectDeleteImage(url) {
      let notDeletetImages = this.product.images.filter(
        (image) => image.deleteImage === false
      );

      if (notDeletetImages.length > 1) {
        this.product.images.map((image) => {
          if (image.url === url) {
            image.deleteImage = !image.deleteImage;
          }
        });
      } else {
        this.product.images.map((image) => {
          if ((image.url === url, image.deleteImage === true)) {
            image.deleteImage = !image.deleteImage;
          }
        });
      }
    },
    // Taking a copy of product
    deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    },

    // Updating Product
    async saveProduct(product_id) {
      try {
        this.alertPopupVivible = false;
        this.loading = true;
        await this.saveProductHead(product_id);
        await this.saveProductFeatures();
        await this.saveProductImages(product_id).then(() => {
          this.loading = false;
          this.succesMessage = true;
          this.errorMessage = false;
          this.warnMessage = false;
          window.location.reload();
        });
      } catch (error) {
        this.errorMessage = true;
        this.succesMessage = false;
        this.warnMessage = false;
        console.log(error);
      }
    },

    // Helper functions
    async saveProductHead(product_id) {
      try {
        const db = getFirestore();
        const changedProductData = {};
        const fieldsToCheck = [
          "brand",
          "description",
          "title",
          "model",
          "price",
          "discount",
        ];

        fieldsToCheck.forEach((field) => {
          if (this.productCopy[field] !== this.product[field]) {
            changedProductData[field] =
              this.product[field].name && field === "brand"
                ? this.product[field].name
                : this.product[field];
          }
          console.log("2 :", this.productCopy[field]);
          console.log(
            "1 :",
            this.product[field] && this.product[field].name && field === "brand"
              ? this.product[field].name
              : this.product[field]
          );
        });

        const productRef = doc(db, "products", this.product.id);
        await updateDoc(productRef, changedProductData);
        this.product.images.map(async (image) => {
          if (
            image.deleteImage === true &&
            image.url === this.product.cover_image
          ) {
            const existImage = this.product.images.find(
              (image) => image.deleteImage === false
            );

            await updateDoc(productRef, {
              cover_image: existImage.url,
            });
            console.log("kapak fotosu degistirildi");
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    async saveProductFeatures() {
      const db = getFirestore();

      let updatedFeatures = [];
      for (let i = 0; i < this.product.features.length; i++) {
        const feature = this.product.features[i];
        const featureCopy = this.productCopy.features[i];

        if (feature.unit_value !== featureCopy.unit_value) {
          const featureRef = doc(db, "products_features", feature.id);
          updatedFeatures.push(
            updateDoc(featureRef, { unit_value: feature.unit_value })
          );
        }

        await Promise.all(updatedFeatures);
      }
    },

    async saveProductImages(product_id) {
      // Delete Images
      const downloadUrls = this.product.images
        .filter((image) => image.deleteImage === true)
        .map((image) => image.url);

      const storage = getStorage();

      const deletePromises = downloadUrls.map((url) => {
        const storageRef = ref(storage, url);
        return deleteObject(storageRef)
          .then(() => {
            console.log("Dosya başarıyla silindi:", url);
          })
          .catch((error) => {
            console.error("Dosya silinirken bir hata oluştu:", url, error);
          });
      });
      await Promise.all(deletePromises);

      // Save Added Images
      if (
        this.$refs.fileUploadRef.files &&
        this.$refs.fileUploadRef.files.length > 0
      ) {
        const uploadPromises = this.$refs.fileUploadRef.files.map(
          async (file) => {
            const storageRef = ref(
              storage,
              `products_images/product_${this.product.id}/${Date.now()}_${
                file.name
              }`
            );

            try {
              await uploadBytes(storageRef, file);
              const imageUrl = getDownloadURL(storageRef);
              console.log("Dosya başarıyla yüklendi:", file.name);
            } catch (error) {
              console.error("Dosya yükleme hatası: ", error);
            }
          }
        );

        await Promise.all(uploadPromises);
      } else {
        console.log("Eklenecek fotoğraflar bulunamadı");
      }
    },

    // Getting Product Data
    async getOverviewProductData() {
      const db = getFirestore();
      const storage = getStorage();

      const cur_overview_product_id = localStorage.getItem(
        "cur_overview_product_id"
      );

      const cur_overview_category_id = localStorage.getItem(
        "cur_overview_category_id"
      );

      if (!cur_overview_product_id) return;

      try {
        const [productData, images, features] = await Promise.all([
          this.getProductData(db, cur_overview_product_id),
          this.getProductImages(storage, `product_${cur_overview_product_id}`),
          this.getProductFeatures(
            db,
            cur_overview_product_id,
            cur_overview_category_id
          ),
        ]);

        if (productData) {
          productData.images = images.map((image) => {
            const imageData = {
              url: image,
              deleteImage: false,
            };

            return imageData;
          });
          productData.features = features;

          this.product = productData;
          console.log(productData);
          localStorage.setItem(
            "curent_overview_product_data",
            JSON.stringify(productData)
          );
        }
      } catch (error) {
        console.error(error);
      }
    },

    // Helper functions
    async getProductData(db, productId) {
      const productRef = doc(db, "products", productId);
      const productSnapshot = await getDoc(productRef);

      return productSnapshot ? productSnapshot.data() : null;
    },

    async getProductImages(storage, imagesFolder) {
      const imagesRef = ref(storage, `products_images/${imagesFolder}`);
      const res = await listAll(imagesRef);

      return Promise.all(
        res.items.map(async (itemRef) => getDownloadURL(itemRef))
      );
    },

    async getProductFeatures(db, productId, categoryId) {
      try {
        const productCategoryFeaturesRef = collection(
          db,
          "product_cetegory_features"
        );
        const productCategoryFeaturesQuery = query(
          productCategoryFeaturesRef,
          where("category_id", "==", categoryId)
        );

        const productCategoryFeaturesSnapshot = await getDocs(
          productCategoryFeaturesQuery
        );

        if (productCategoryFeaturesSnapshot.empty) return [];

        const featurePromises = productCategoryFeaturesSnapshot.docs.map(
          async (featureDoc) => {
            const featureData = featureDoc.data();
            const productsFeaturesRef = collection(db, "products_features");
            const productsFeaturesQuery = query(
              productsFeaturesRef,
              where("product_id", "==", productId),
              where("product_category_feature_id", "==", featureData.id)
            );

            const productsFeaturesSnapshot = await getDocs(
              productsFeaturesQuery
            );

            return productsFeaturesSnapshot.docs.map((featureValueDoc) => {
              const featureValueData = featureValueDoc.data();
              return {
                id: featureValueData.id,
                name: featureData.name,
                unit_name: featureData.unit_name,
                unit_value: featureValueData.unit_value,
              };
            });
          }
        );

        const features = (await Promise.all(featurePromises)).flat();
        console.log("Features:", features); // Debug için eklendi
        return features;
      } catch (error) {
        console.error("Error in getProductFeatures:", error); // Debug için eklendi
        return [];
      }
    },

    async deleteProduct() {
      this.alertPopupVivible = false;
      this.loading = true;
      const db = getFirestore();
      const productDocRef = doc(db, "products", this.product.id);

      try {
        // Delete the product document
        await deleteDoc(productDocRef);

        // Query and delete documents in products_features collection
        const productDocRefQuery = query(
          collection(db, "products_features"),
          where("product_id", "==", this.product.id)
        );

        // Get documents
        const querySnapshot = await getDocs(productDocRefQuery);

        // Create an array of promises for deleting each document
        const deletePromises = querySnapshot.docs.map(async (doc) => {
          await deleteDoc(doc.ref);
        });

        // Wait for all delete operations to complete
        await Promise.all(deletePromises).then(() => {
          this.loading = false;
          window.location.reload();
        });

        console.log("Product and related documents deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
  },

  async mounted() {
    // Get Brands
    const db = getFirestore();
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

    this.loading = true;
    await this.getOverviewProductData().then(() => {
      this.loading = false;
    });
    this.productCopy = this.deepCopy(this.product);
  },
};
</script>
