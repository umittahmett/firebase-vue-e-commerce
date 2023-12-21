<template>
  <!-- Add new Category -->
  <div
    class="w-full bg-gray-100"
    :class="{
      'opacity-50': loading === true,
    }"
  >
    <div class="w-full max-w-7xl mx-auto bg-gray-100 px-3 py-10">
      <Button
        class="bg-[#10b981] text-white px-5 p-2.5"
        label="Yeni Özellik Ekle"
        @click="AddInput()"
        icon="pi pi-plus"
      />

      <!-- Global Category Type -->
      <p class="font-light mt-4">Kategori Türü*</p>
      <Dropdown
        v-model="selectedCategory"
        :options="categories"
        optionLabel="name"
        placeholder="Genel Kategori Türü Seç"
        class="w-full md:w-14rem max-w-[400px]"
        @change="getFeaturesForCategory(selectedCategory.id)"
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

      <!-- Category Feature Names -->
      <div class="grid grid-cols-3 gap-6 justify-start">
        <div
          v-for="numInput in newFeatures"
          :key="numInput"
          class="flex items-end justify-start gap-2"
        >
          <div>
            <p class="font-light mt-4">Özellik</p>
            <div class="flex justify-start items-center gap-2">
              <InputText
                class="w-full max-w-[400px] p-2.5"
                type="text"
                v-model="numInput.name"
                placeholder="Özellik Adı"
              />

              <InputText
                class="w-full max-w-[400px] p-2.5"
                type="text"
                v-model="numInput.unit_name"
                placeholder="Değer"
              />
            </div>
          </div>

          <Button
            class="bg-[#10b981] text-white px-5 p-2.5"
            icon="pi pi-times"
            severity="danger"
            aria-label="Cancel"
            @click="DeleteInput(numInput.id)"
          />
        </div>
      </div>

      <!-- Exist Category Features -->
      <p class="font-bold text-2xl mt-20">Aktif Özellikler</p>
      <p class="font-light my-2">
        NOT: Kırmızı olarak seçilen tüm özellikler kaldırılır
      </p>
      <div class="grid grid-cols-3 gap-6 justify-start">
        <div
          v-for="feature in activeFeatures"
          :key="feature"
          class="flex items-end justify-start gap-2"
        >
          <div>
            <p class="font-light">Özellik {{}}</p>
            <div class="flex justify-start items-center gap-2">
              <InputText
                class="w-full max-w-[400px] p-2.5"
                type="text"
                v-model="feature.name"
                placeholder="Özellik Adı"
              />

              <InputText
                class="w-full max-w-[400px] p-2.5"
                type="text"
                v-model="feature.unit_name"
                placeholder="Değer"
              />
            </div>
          </div>

          <Button
            class="bg-[#10b981] text-white px-5 p-2.5"
            :class="{
              'bg-[#f86060]': deletedFeatures.includes(feature.id),
            }"
            :icon="getIconOfFeature(feature.id)"
            severity="danger"
            aria-label="Cancel"
            @click="toggleFeature(feature.id)"
          />
        </div>
      </div>

      <!-- Save -->
      <Button
        class="bg-[#10b981] text-white px-5 p-2.5 mt-8"
        label="Kaydet"
        @click="alertPopupVivible = true"
        :disabled="!selectedCategory"
      />

      <Button
        class="bg-[#f86060] text-white px-5 p-2.5 mt-8 ml-2"
        label="Kategoriyi Sil"
        @click="alertPopupVivible2 = true"
        :disabled="!selectedCategory"
      />

      <!-- Allow Popup -->
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
            @click="saveChanges"
          />

          <Button
            class="bg-red-300 p-2.5"
            label="İptal Et"
            @click="alertPopupVivible = false"
          />
        </div>
      </Dialog>

      <Dialog
        id="dlg"
        header="Uyarı"
        v-model:visible="alertPopupVivible2"
        :style="{ width: '30vw' }"
        class="text-center"
      >
        <p>Kategoriyi Silmek İstiyor musunuz ?</p>
        <div class="flex justify-center items-center mt-4 gap-4">
          <Button
            class="bg-[#10b981] text-white px-5 p-2.5"
            label="Sil"
            @click="deleteCategory"
          />

          <Button
            class="bg-red-300 p-2.5"
            label="İptal Et"
            @click="alertPopupVivible2 = false"
          />
        </div>
      </Dialog>
      <!-- Feedback Messages -->
      <div class="fixed top-5 right-5 max-w-sm">
        <Message :messageType="messageType" :text="messageText" />
      </div>
    </div>

    <div
      v-if="loading"
      class="text-center fixed top-0 left-0 w-full h-full flex justify-center items-center"
    >
      <ProgressSpinner class="w-24 h-24" />
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
import Message from "../../components/Common/Message.vue";
import ProgressSpinner from "primevue/progressspinner";

import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { createWizardStore } from "../../stores/counter";

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
      store: null,
      deletedFeatures: [],
      activeFeatures: [],
      activeFeaturesClone: [],
      loading: false,
      alertPopupVivible: false,
      alertPopupVivible2: false,
      messageText: "",
      messageType: "",
      deleteMessageType: "",
      deleteMessageText: "",
      feedback: {
        type: null,
        message: "",
      },
      newFeatures: [],
      categories: [],
      selectedCategory: null,
    };
  },
  methods: {
    async saveChanges() {
      this.loading = true;
      this.alertPopupVivible = false;

      try {
        const db = getFirestore();

        // Add New Category Feature
        const categoryFeaturesRef = collection(db, "product_cetegory_features");
        const categoryFeaturesSnapshot = await getDocs(categoryFeaturesRef);

        // Control & Add Feature Names
        if (this.newFeatures.length > 0 && this.selectedCategory) {
          const addFeaturePromises = this.newFeatures.map(async (feature) => {
            const existingGlobalCategoryFeature =
              categoryFeaturesSnapshot.docs.find(
                (categoryFeature) =>
                  categoryFeature.data().name === feature.name &&
                  categoryFeature.data().category_id ===
                    this.selectedCategory.id
              );

            if (existingGlobalCategoryFeature) {
              this.messageText = `${feature.name} zaten mevcut`;

              throw new Error(`${feature.name} zaten mevcut`);
            } else if (!feature.name || feature.name === " ") {
              this.messageText = "Lütfen Kutuları Eksiksiz Doldurun";

              throw new Error("Lütfen Kutuları Eksiksiz Doldurun");
            }

            const newFeature = await addDoc(categoryFeaturesRef, {
              category_id: this.selectedCategory.id,
              name: feature.name,
              unit_name: feature.unit_name,
            });

            const updatedFeature = doc(
              db,
              "product_cetegory_features",
              newFeature.id
            );

            await updateDoc(updatedFeature, { id: newFeature.id });

            // Get Products has the same category_id
            const productsRef = collection(db, "products");

            const productsQuery = query(
              productsRef,
              where("category_id", "==", this.selectedCategory.id)
            );

            const productsSnapshot = await getDocs(productsQuery);
            //>

            // Products Features ref
            const productsFeaturesRef = collection(db, "products_features");

            if (productsSnapshot.docs.length > 0) {
              productsSnapshot.docs.forEach(async (product) => {
                const newProductFeature = await addDoc(productsFeaturesRef, {
                  product_id: product.data().id,
                  product_category_feature_id: newFeature.id,
                  unit_value: "",
                });

                const updatednewProductFeature = doc(
                  db,
                  "products_features",
                  newProductFeature.id
                );

                await updateDoc(updatednewProductFeature, {
                  id: newProductFeature.id,
                });
              });
            }

            return `${feature.name} başarıyla eklendi.`;
          });

          await Promise.all(addFeaturePromises).then(() => {
            this.store.feedBackMessageVisible = true;
            this.messageText = "Değişiklikler Başarıyla Kaydedildi";
            this.messageType = "success";
            if (this.deletedFeatures.length === 0) {
              this.loading = false;
              this.deletedFeatures = [];
              this.newFeatures = [];
              this.selectedCategory = null;
              this.activeFeatures = [];
            }
          });
        } else {
          this.store.feedBackMessageVisible = true;
          this.messageText = "Herhangi bir özellik eklenmedi.";
          this.messageType = "warn";
        }

        // Update Existing Features
        const updatePromises = [];
        console.log(JSON.stringify(this.activeFeaturesClone));
        const featuresClone = this.activeFeaturesClone;

        for (let i = 0; i < this.activeFeatures.length; i++) {
          const activeFeature = this.activeFeatures[i];
          const activeFeatureClone = featuresClone[i];
          console.log("1");

          if (
            activeFeature.name !== activeFeatureClone.name ||
            activeFeature.unit_name !== activeFeatureClone.unit_name
          ) {
            const updatedFeatureDoc = doc(
              db,
              "product_cetegory_features",
              activeFeature.id
            );

            // Push the promise to the array
            updatePromises.push(
              updateDoc(updatedFeatureDoc, {
                name: activeFeature.name,
                unit_name: activeFeature.unit_name,
              })
            );
          }
        }

        // Wait for all promises to resolve
        await Promise.all(updatePromises);

        // Delete Selected Features
        let deleteFeaturePromises = [];
        if (this.deletedFeatures.length > 0) {
          deleteFeaturePromises = this.deletedFeatures.map(async (id) => {
            await deleteDoc(doc(db, "product_cetegory_features", id));
            return `${id} başarıyla silindi.`;
          });
        }

        await Promise.all(deleteFeaturePromises).then(() => {
          this.store.feedBackMessageVisible = true;
          this.messageText = "Değişiklikler Başarıyla Kaydedildi";
          this.messageType = "success";
          this.loading = false;
          this.deletedFeatures = [];
          this.newFeatures = [];
          this.selectedCategory = null;
          this.activeFeatures = [];
        });
      } catch (error) {
        console.log(error);
        this.loading = false;
        this.store.feedBackMessageVisible = true;
        this.messageText = "Bir Şeyler Ters Gitti";
        this.messageType = "error";
      }
    },

    async deleteCategory() {
      this.alertPopupVivible2 = false;
      this.loading = true;
      const db = getFirestore();
      const categoryDocRef = doc(db, "categories", this.selectedCategory.id);

      try {
        // Delete the category document
        await deleteDoc(categoryDocRef);

        // Query and delete documents in product_category_features collection
        const productCategoryFeaturesQuery = query(
          collection(db, "product_cetegory_features"),
          where("category_id", "==", this.selectedCategory.id)
        );

        const productCategoryFeaturesSnapshot = await getDocs(
          productCategoryFeaturesQuery
        );

        let product_category_features_ids = [];
        const deletePromises1 = productCategoryFeaturesSnapshot.docs.map(
          async (doc) => {
            product_category_features_ids.push(doc.id);
            await deleteDoc(doc.ref);
          }
        );

        // Delete products_features
        const deletePromises2 = [];
        product_category_features_ids.forEach(async (id) => {
          const productsFeaturesQuerySnapshot = await getDocs(
            query(
              collection(db, "products_features"),
              where("product_category_feature_id", "==", id)
            )
          );

          productsFeaturesQuerySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
          deletePromises2.push(true);
        });

        // Delete Products
        const productsQuerySnapshot = await getDocs(
          query(
            collection(db, "products"),
            where("category_id", "==", this.selectedCategory.id)
          )
        );

        const deletePromises3 = productsQuerySnapshot.docs.map(async (doc) => {
          await deleteDoc(doc.ref);
        });

        // Wait for all delete operations to complete
        await Promise.all(
          deletePromises1,
          ...deletePromises2,
          deletePromises3
        ).then(() => {
          this.loading = false;
          // window.location.reload();
        });

        console.log("Category and related documents deleted successfully");
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    },

    async updataProductsFeatures() {
      const db = getFirestore();

      // Add New Category Feature
      const categoryFeaturesRef = collection(db, "product_cetegory_features");
      const categoryFeaturesSnapshot = await getDocs(categoryFeaturesRef);
    },

    async updateCategory() {
      try {
        const db = getFirestore();
        const changedFeaturesData = {};
        const fieldsToCheck = ["name", "unit_name"];
      } catch (error) {
        console.log(error);
      }
    },

    // Get Features For Category
    async getFeaturesForCategory(id) {
      this.deletedFeatures = [];

      try {
        const db = getFirestore();
        const categoryFeaturesRef = collection(db, "product_cetegory_features");
        const categoryFeaturesQuery = query(
          categoryFeaturesRef,
          where("category_id", "==", id)
        );

        const categorySnapshot = await getDocs(categoryFeaturesQuery);
        if (!categorySnapshot.empty) {
          let categoryFeatures = [];
          categorySnapshot.docs.forEach((feature) => {
            categoryFeatures.push(feature.data());
          });

          this.activeFeaturesClone = this.deepCopy(categoryFeatures);

          this.activeFeatures = categoryFeatures;
        } else {
          console.log("category Features is empty");
        }
      } catch (error) {
        console.log(error);
      }
    },

    deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    },

    toggleFeature(id) {
      if (this.deletedFeatures.includes(id)) {
        // Eğer özellik listede varsa, çıkar.
        const index = this.deletedFeatures.indexOf(id);
        this.deletedFeatures.splice(index, 1);
      } else {
        // Eğer özellik listede yoksa, ekle.
        this.deletedFeatures.push(id);
      }
    },

    getIconOfFeature(id) {
      return this.deletedFeatures.includes(id) ? "pi pi-times" : "pi pi-check";
    },

    AddInput() {
      this.newFeatures.push({
        id: this.newFeatures.length + 1,
        name: "",
        unit_name: "",
      });
    },

    DeleteInput(id) {
      this.newFeatures = this.newFeatures.filter((input) => input.id !== id);
    },

    // Control Values
    valueControl() {
      if (this.categoryName) {
        let isAnyInputEmpty = false;

        this.newFeatures.forEach((input) => {
          if (!input.name) {
            isAnyInputEmpty = true;
          }
        });

        this.saveButtonDisabled = isAnyInputEmpty;
      } else {
        this.saveButtonDisabled = true;
      }

      console.log("Save Button Disabled: ", this.saveButtonDisabled);
    },
  },

  async mounted() {
    this.store = createWizardStore();
    const db = getFirestore();
    // Get Categories
    const categoriesRef = collection(db, "categories");
    const categorySnapshot = await getDocs(categoriesRef);
    if (!categorySnapshot.empty) {
      const categories = categorySnapshot.docs;
      categories.forEach((category) => {
        this.categories.push(category.data());
        console.log(category.data());
      });
    } else {
      console.log("categories is empty");
    }
  },
};
</script>
