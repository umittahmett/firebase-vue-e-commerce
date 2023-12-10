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
        label="Özellik Ekle"
        @click="AddInput()"
        icon="pi pi-plus"
      />

      <!-- Global Category Type -->
      <p class="font-light mt-4">Genel Kategori Türü*</p>
      <Dropdown
        editable
        v-model="selectedGlobalCategory"
        :options="globalCategories"
        optionLabel="name"
        placeholder="Genel Kategori Türü Seç"
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

      <p class="font-light mt-4">Kategori Adı*</p>
      <InputText
        class="w-full max-w-[400px] p-2.5"
        type="text"
        v-model="categoryName"
        placeholder="örn. Gaming Laptoplar"
      />

      <!-- Category Feature Names -->
      <div
        v-for="numInput in Inputs"
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

      <!-- Save -->
      <Button
        class="bg-[#10b981] text-white px-5 p-2.5 mt-8"
        label="Kaydet"
        @click="alertPopupVivible = true"
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
            @click="saveCategory"
          />

          <Button
            class="bg-red-300 p-2.5"
            label="İptal Et"
            @click="alertPopupVivible = false"
          />
        </div>
      </Dialog>

      <!-- Feedback Messages -->
      <div class="fixed top-5 right-5 max-w-sm">
        <Message :hidden="!succesMessage" severity="success"
          >{{ alertText }}
        </Message>

        <Message :hidden="!errorMessage" severity="error"
          >{{ alertText }}
        </Message>

        <Message :hidden="!warnMessage" severity="warn"
          >{{ alertText }}
        </Message>
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
import Message from "primevue/message";
import ProgressSpinner from "primevue/progressspinner";

import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  writeBatch,
  getDocs,
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
      alertPopupVivible: false,
      succesMessage: false,
      errorMessage: false,
      warnMessage: false,
      featureTypes: [],
      features: null,
      categoryName: "",
      saveButtonDisabled: false,
      Inputs: [
        {
          id: 0,
          name: null,
          unit_name: null,
        },
      ],
      globalCategories: [],
      selectedGlobalCategory: null,
      newGlobalCategoryId: null,
      alertText: "",
    };
  },
  methods: {
    AddInput() {
      this.Inputs.push({
        id: this.Inputs.length + 1,
        name: "",
        unit_name: "",
      });
    },

    DeleteInput(id) {
      this.Inputs = this.Inputs.filter((input) => input.id !== id);
    },

    // Save Category
    async saveCategory() {
      this.loading = true;
      this.alertPopupVivible = false;

      if (!this.categoryName) {
        this.warnMessage = true;
        this.loading = false;
        return;
      }

      try {
        const db = getFirestore();

        // Kategori Adı Kontrolü
        const categoriesCollection = collection(db, "categories");
        const categorySnapshot = await getDocs(categoriesCollection);
        const existingCategory = categorySnapshot.docs.find(
          (category) => category.data().name === this.categoryName
        );

        if (existingCategory) {
          this.errorMessage = true;
          this.alertText = `${this.categoryName} kategorisi zaten mevcut`;
          this.loading = false;
          return;
        }

        // Genel Kategori Kontrolü
        if (
          this.selectedGlobalCategory &&
          typeof this.selectedGlobalCategory === "string"
        ) {
          const globalCategoriesCollection = collection(
            db,
            "global_categories"
          );
          const globalCategoriesSnapshot = await getDocs(
            globalCategoriesCollection
          );
          const existingGlobalCategory = globalCategoriesSnapshot.docs.find(
            (globalCategory) =>
              globalCategory.data().name === this.selectedGlobalCategory
          );

          if (existingGlobalCategory) {
            this.errorMessage = true;
            this.alertText = `${this.selectedGlobalCategory} genel kategorisi zaten mevcut`;
            this.loading = false;
            return;
          }

          const newGlobalCategory = await addDoc(globalCategoriesCollection, {
            name: this.selectedGlobalCategory,
          });

          const updatedBrandDoc = doc(
            db,
            "global_categories",
            newGlobalCategory.id
          );
          this.newGlobalCategoryId = newGlobalCategory.id;
          await updateDoc(updatedBrandDoc, { id: newGlobalCategory.id });
        }

        // Kategori Kaydetme İşlemi
        const newcategoriesCollection = collection(db, "categories");
        const catCollRef = await addDoc(newcategoriesCollection, {
          name: this.categoryName,
          global_category_id: this.newGlobalCategoryId
            ? this.newGlobalCategoryId
            : this.selectedGlobalCategory.id,
        });

        const updatedCategoryDoc = doc(db, "categories", catCollRef.id);
        await updateDoc(updatedCategoryDoc, { id: catCollRef.id });

        // Özelliklerin Kaydedilmesi
        const prodCatFeaturesCollection = collection(
          db,
          "product_cetegory_features"
        );
        const batch = writeBatch(db);

        this.Inputs.forEach((featureType) => {
          const newDocRef = doc(prodCatFeaturesCollection);
          batch.set(newDocRef, {
            id: newDocRef.id,
            name: featureType.name,
            unit_name: featureType.unit_name,
            category_id: catCollRef.id,
          });
        });

        await batch.commit().then(() => {
          this.succesMessage = true;
          this.loading = false;
          window.location.reload();
        });
      } catch (error) {
        console.error(error);
        this.errorMessage = true;
        this.loading = false;
      }
    },

    // Control Values
    valueControl() {
      if (this.categoryName) {
        let isAnyInputEmpty = false;

        this.Inputs.forEach((input) => {
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
    const db = getFirestore();
    // Get Global Categories
    const categoriesRef = collection(db, "global_categories");
    const categorySnapshot = await getDocs(categoriesRef);
    if (!categorySnapshot.empty) {
      const categories = categorySnapshot.docs;
      categories.forEach((category) => {
        this.globalCategories.push(category.data());
        console.log(category.data());
      });
    } else {
      console.log("categories is empty");
    }
  },
};
</script>
